import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../dto/CreateProductDto';
import { NotFoundException } from '@nestjs/common';

const mockProduct: Product|any = {
  _id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  category: 'Test Category',
  save: jest.fn().mockResolvedValue(this),
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
};

const mockUpdatedProduct: Product = {
  ...mockProduct,
  price: 150,
};

// Mocking the Mongoose model
const mockProductModel = {
  create: jest.fn().mockResolvedValue(mockProduct),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockProduct]), // Fix here
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProduct),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUpdatedProduct),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProduct),
  })
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService) as ProductsService;
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        category: 'Test Category',
      };

      const result = await service.create(createProductDto);
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.findById).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if product not found', async () => {
      mockProductModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProduct]);
      expect(mockProductModel.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const updateProductDto: { price: number } = {
        price: 150,
      };

      const result = await service.update('1', updateProductDto);
      expect(result).toEqual(mockUpdatedProduct);
      expect(mockProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        updateProductDto,
        { new: true , runValidators: true},
      );
    });

    it('should throw a NotFoundException if product not found for update', async () => {
      mockProductModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const updateProductDto = {
        price: 150,
      };

      await expect(service.update('2', updateProductDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product by ID', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockProduct);
      expect(mockProductModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if product not found for deletion', async () => {
      mockProductModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
});
