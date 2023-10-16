import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


// Envia todas los permisos

export async function getPermission(req, res) {
    try {
        const permissions = await prisma.permission.findMany()
        res.json(permissions)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// crear un permiso

export async function createPermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            idPermission,
            module,
            typePermission,
            catalogId // Asumiendo que recibes el ID del catálogo

        } = req.body;

        // Verifica si los campos obligatorios están presentes
        if (!module || !typePermission) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

        // Comprueba si el catálogo con el ID proporcionado existe
        const catalog = await prisma.catalog.findUnique({
            where: {
                idCatalog: catalogId
            }
        });

        if (!catalog) {
            return res.status(400).json({
                message: 'El catálogo especificado no existe.'
            });
        }

        const newPermission = await prisma.permission.create({
            data: {
                module,
                typePermission,
                catalog: {
                    connect: {
                        idCatalog: catalogId
                    }
                }
            }
        });
        res.json(newPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


