// // import { Injectable, RequestMethod } from "@nestjs/common";
// // import { METHOD_METADATA, PATH_METADATA } from "@nestjs/common/constants";
// // import { ModulesContainer, Reflector } from "@nestjs/core";
// // import { Role } from "src/role/entities/role.entity";
// // import { DataSource } from 'typeorm';

// // @Injectable()
// // export class RolesSeeder {
// //   constructor(
// //     private readonly dataSource: DataSource,
// //     private readonly modulesContainer: ModulesContainer,
// //     private readonly reflector: Reflector
// //   ) {}

// //   async seed() {
// //     const roleRepo = this.dataSource.getRepository(Role);

// //     // Loop over all modules
// //     for (const [moduleKey, moduleRef] of this.modulesContainer.entries()) {
// //       const controllers = [...moduleRef.controllers.values()];
// //       for (const wrapper of controllers) {
// //         const controllerClass = wrapper.metatype;
// //         const controllerName = controllerClass.name.replace('Controller', '');
// //         const controllerPath = this.reflector.get(PATH_METADATA, controllerClass) || '';

// //         // Loop over methods
// //         const methodNames = Object.getOwnPropertyNames(controllerClass.prototype).filter(
// //           (name) => name !== 'constructor'
// //         );

// //         for (const methodName of methodNames) {
// //           const methodRef = controllerClass.prototype[methodName];

         
// //           const path = this.reflector.get(PATH_METADATA, methodRef);
// //           const requestMethod: RequestMethod = this.reflector.get(METHOD_METADATA, methodRef);

// //           if (path && requestMethod !== undefined) {
// //             const endpoint = Array.isArray(path) ? path[0] : path;
// //             // request.route.path.replace(/^\//, '').toLowerCase();
// //             const httpMethod = RequestMethod[requestMethod];

// //             const exists = await roleRepo.findOne({
// //               where: { module_name: controllerName, endpoint, method: httpMethod },
// //             });

// //             if (!exists) {
// //               const role = roleRepo.create({
// //                 module_name: controllerName.toLowerCase(),
// //                 endpoint:endpoint.toLowerCase(),
// //                 method: httpMethod.toLowerCase(),
// //                 can_teacher: true,
// //                 can_student: false,
// //                 // can_user: false, 
// //               });
// //               await roleRepo.save(role);
// //               console.log(`Added role: ${controllerName} -> ${endpoint} [${httpMethod}]`);
// //             }
// //           }
// //         }
// //       }
// //     }

// //     console.log('Roles seeding finished!');
// //   }
// // }
// // import { Injectable, RequestMethod } from '@nestjs/common';
// // import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
// // import { ModulesContainer, Reflector } from '@nestjs/core';
// // import { Role } from 'src/role/entities/role.entity';
// // import { DataSource } from 'typeorm';

// // @Injectable()
// // export class RolesSeeder {
// //   constructor(
// //     private readonly dataSource: DataSource,
// //     private readonly modulesContainer: ModulesContainer,
// //     private readonly reflector: Reflector,
// //   ) {}

// //   async seed() {
// //     const roleRepo = this.dataSource.getRepository(Role);

// //     for (const [, moduleRef] of this.modulesContainer.entries()) {
// //       const controllers = [...moduleRef.controllers.values()];

// //       for (const wrapper of controllers) {
// //         const controllerClass = wrapper.metatype;
// //         if (!controllerClass) continue;

// //         const moduleName = controllerClass.name
// //           .replace('Controller', '')
// //           .toLowerCase();

// //         const controllerPath =
// //           this.reflector.get(PATH_METADATA, controllerClass) || '';

// //         const methods = Object.getOwnPropertyNames(
// //           controllerClass.prototype,
// //         ).filter((m) => m !== 'constructor');

// //         for (const methodName of methods) {
// //           const methodRef = controllerClass.prototype[methodName];

// //           const methodPath = this.reflector.get(PATH_METADATA, methodRef);
// //           const requestMethod = this.reflector.get(
// //             METHOD_METADATA,
// //             methodRef,
// //           );

// //           if (methodPath === undefined || requestMethod === undefined) continue;

// //           const fullPath =`${controllerPath}/${Array.isArray(methodPath) ? methodPath[0] : methodPath}`
// //   .replace(/^\/+/, '')  
// //   .replace(/\/+$/, '')  
// //   .toLowerCase();

// //           const httpMethod = RequestMethod[requestMethod].toLowerCase();

// //           const exists = await roleRepo.findOne({
// //             where: {
// //               module_name: moduleName, 
// //               endpoint: fullPath,
// //               method: httpMethod,
// //             },
// //           });

// //           if (!exists) {
// //             const role = roleRepo.create({
// //               module_name: moduleName,
// //               endpoint: fullPath,
// //               method: httpMethod,name:'user',
// //               can_teacher: true,
// //               can_student: false,
// //             }); 

// //             await roleRepo.save(role);

// //             console.log(
// //               `Added role: ${moduleName} -> ${fullPath} [${httpMethod}]`,
// //             );
// //           }
// //         }
// //       }
// //     }

// //     console.log('✅ Roles seeding finished!');
// //   }
// // }
// import { Injectable, RequestMethod } from '@nestjs/common';
// import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
// import { ModulesContainer, Reflector } from '@nestjs/core';
// import { DataSource } from 'typeorm';
// import { Role } from 'src/role/entities/role.entity';

// @Injectable()
// export class RolesSeeder {
//   constructor(
//     private readonly dataSource: DataSource,
//     private readonly modulesContainer: ModulesContainer,
//     private readonly reflector: Reflector,
//   ) {}

//   async seed() {
//     const roleRepo = this.dataSource.getRepository(Role);

//     for (const [, moduleRef] of this.modulesContainer.entries()) {
//       const controllers = [...moduleRef.controllers.values()];

//       for (const wrapper of controllers) {
//         const controllerClass = wrapper.metatype;
//         if (!controllerClass) continue;

//         // 🔹 module name
//         const moduleName = controllerClass.name
//           .replace('Controller', '')
//           .toLowerCase();

//         // 🔹 controller path
//         const controllerPath =
//           this.reflector.get(PATH_METADATA, controllerClass) || '';

//         // 🔹 methods inside controller
//         const methods = Object.getOwnPropertyNames(
//           controllerClass.prototype,
//         ).filter((m) => m !== 'constructor');

//         for (const methodName of methods) {
//           const methodRef = controllerClass.prototype[methodName];

//           const methodPath = this.reflector.get(PATH_METADATA, methodRef);
//           const requestMethod = this.reflector.get(
//             METHOD_METADATA,
//             methodRef,
//           );

//           if (methodPath === undefined || requestMethod === undefined) continue;

//           // 🔹 full endpoint (supports :id)
//           const fullPath = `${controllerPath}/${
//             Array.isArray(methodPath) ? methodPath[0] : methodPath
//           }`
//             .replace(/^\/+|\/+$/g, '')
//             .toLowerCase();

//           const httpMethod =
//             RequestMethod[requestMethod].toLowerCase();

//           // 🔹 extract query keys
//           const queryKeys = this.extractQueryKeys(methodRef);

//           const exists = await roleRepo.findOne({
//             where: {
//               module_name: moduleName,
//               endpoint: fullPath,
//               method: httpMethod,
//             },
//           });

//           if (exists) continue;

//           const role = roleRepo.create({
//             module_name: moduleName,
//             endpoint: fullPath,
//             method: httpMethod,
//             query: queryKeys ? queryKeys.join(',') : null,
//             name: 'user',
//             can_teacher: true,
//             can_student: false,
//           });

//           await roleRepo.save(role);

//           console.log(
//             `✅ Added role: ${moduleName} -> ${fullPath} [${httpMethod}] query=${role.query}`,
//           );
//         }
//       }
//     }

//     console.log('🎉 Roles seeding finished!');
//   }

//   /**
//    * Extract query param names from @Query decorators
//    */
//   private extractQueryKeys(methodRef: any): string[] | null {
//     const args = Reflect.getMetadata('__routeArguments__', methodRef);
//     if (!args) return null;

//     const queryKeys = Object.values(args)
//       .filter((arg: any) => arg.type === 4) // 4 = QUERY
//       .map((arg: any) => arg.data)
//       .filter(Boolean);

//     return queryKeys.length ? queryKeys : null;
//   }
// }
import { Injectable, RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { ModulesContainer, Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class RolesSeeder {
  constructor(
    private readonly dataSource: DataSource,
    private readonly modulesContainer: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}

  async seed() {
    const roleRepo = this.dataSource.getRepository(Role);

    /**
     * ------------------------------------------------
     * 1️⃣ Add static routes (uploads / pdf-images)
     * ------------------------------------------------
     */
    const staticRoutes = [
      { endpoint: 'uploads', method: 'get' },
      { endpoint: 'pdf-images', method: 'get' },
    ];

    for (const route of staticRoutes) {
      const exists = await roleRepo.findOne({
        where: {
          module_name: 'static',
          endpoint: route.endpoint,
          method: route.method,
        },
      });

      if (!exists) {
        const role = roleRepo.create({
          module_name: 'static',
          endpoint: route.endpoint,
          method: route.method,
          name: 'user',
          query: null,
          can_teacher: true,
          can_student: false,
        });

        await roleRepo.save(role);

        console.log(`✅ Added static route: ${route.endpoint}`);
      }
    }

    /**
     * ------------------------------------------------
     * 2️⃣ Scan controllers normally
     * ------------------------------------------------
     */
    for (const [, moduleRef] of this.modulesContainer.entries()) {
      const controllers = [...moduleRef.controllers.values()];

      for (const wrapper of controllers) {
        const controllerClass = wrapper.metatype;
        if (!controllerClass) continue;

        // module name
        const moduleName = controllerClass.name
          .replace('Controller', '')
          .toLowerCase();

        // controller path
        const controllerPath =
          this.reflector.get(PATH_METADATA, controllerClass) || '';

        const methods = Object.getOwnPropertyNames(
          controllerClass.prototype,
        ).filter((m) => m !== 'constructor');

        for (const methodName of methods) {
          const methodRef = controllerClass.prototype[methodName];

          const methodPath = this.reflector.get(PATH_METADATA, methodRef);
          const requestMethod = this.reflector.get(
            METHOD_METADATA,
            methodRef,
          );

          if (methodPath === undefined || requestMethod === undefined) continue;

          // full endpoint
          const fullPath = `${controllerPath}/${
            Array.isArray(methodPath) ? methodPath[0] : methodPath
          }`
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase();

          const httpMethod = RequestMethod[requestMethod].toLowerCase();

          // extract query keys
          const queryKeys = this.extractQueryKeys(methodRef);

          const exists = await roleRepo.findOne({
            where: {
              module_name: moduleName,
              endpoint: fullPath,
              method: httpMethod,
            },
          });

          if (exists) continue;

          const role = roleRepo.create({
            module_name: moduleName,
            endpoint: fullPath,
            method: httpMethod,
            query: queryKeys ? queryKeys.join(',') : null,
            name: 'user',
            can_teacher: true,
            can_student: false,
          });

          await roleRepo.save(role);

          console.log(
            `✅ Added role: ${moduleName} -> ${fullPath} [${httpMethod}] query=${role.query}`,
          );
        }
      }
    }

    console.log('🎉 Roles seeding finished!');
  }

  /**
   * Extract query params from @Query()
   */
  private extractQueryKeys(methodRef: any): string[] | null {
    const args = Reflect.getMetadata('__routeArguments__', methodRef);
    if (!args) return null;

    const queryKeys = Object.values(args)
      .filter((arg: any) => arg.type === 4) // QUERY
      .map((arg: any) => arg.data)
      .filter(Boolean);

    return queryKeys.length ? queryKeys : null;
  }
} 