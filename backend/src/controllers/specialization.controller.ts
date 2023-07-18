import { Injectable } from '@nestjs/common';
import { SpecializationDto } from '../dtos/specialization.dto';
import { Specialization } from '../items/interfaces/specialization.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/**
 * Сервис для работы с специализациями.
 */
@Injectable()
export class SpecializationsService {
  constructor(
    @InjectModel('Specialization')
    private readonly specializationModel: Model<Specialization>,
  ) {}

  /**
   * Получение всех специализаций.
   * @returns {Promise<Specialization[]>}
   */
  async getAllSpecializations(): Promise<Specialization[]> {
    return this.specializationModel.find().exec();
  }

  /**
   * Получение всех специализаций.
   * @returns {Promise<Specialization[]>}
   */
  async createSpecialization(
    specializationDto: SpecializationDto,
  ): Promise<Specialization> {
    const newSpecialization = new this.specializationModel(specializationDto);
    return newSpecialization.save();
  }

  /**
   * Обновление специализации.
   * @param {string} id - id специализации.
   * @param {SpecializationDto} specializationDto - dto специализации.
   * @returns {Promise<Specialization>}
   */
  async updateSpecialization(
    id: string,
    specializationDto: SpecializationDto,
  ): Promise<Specialization> {
    return this.specializationModel.findByIdAndUpdate(id, specializationDto, {
      new: true,
    });
  }

  /**
   * Удаление специализации.
   * @param {string} id - id специализации.
   * @returns {Promise<void>}
   */
  async deleteSpecialization(id: string): Promise<void> {
    await this.specializationModel.findByIdAndDelete(id);
  }
}
