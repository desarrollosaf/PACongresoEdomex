import { Body, Controller, Get, Post } from "@nestjs/common";
import { DialogosService } from "./dialogos.service";

@Controller('dialogos')
export class DialogosController {
  constructor(private readonly DialogoService: DialogosService) {}

  @Get()
  findAll() {
    return this.DialogoService.findAll();
  }
}
