import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesaService } from './mesa.service';

@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

@Get()
  findAll() {
    return this.mesaService.findAll();
  }
}



