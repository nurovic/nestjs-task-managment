import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-taskt-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const record = await this.tasksRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return record;
  }

  async createTask(createTaskDto: CreateTaskDTO) {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();
    return task;
  }
}
