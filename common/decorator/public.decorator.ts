// import { Reflector } from "@nestjs/core";

import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('Public', true);