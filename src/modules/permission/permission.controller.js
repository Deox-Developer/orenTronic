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

// Actualizar un permiso
export async function updatePermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            permissionId, // Asumiendo que recibes el ID del permiso a actualizar
            module,
            typePermission,
            catalogId // Asumiendo que recibes el ID del catálogo
        } = req.body;

        // Verifica si el campo permissionId está presente
        if (!permissionId) {
            return res.status(400).json({
                message: 'Se requiere el ID del permiso para la actualización.'
            });
        }

        // Comprueba si el permiso con el ID proporcionado existe
        const existingPermission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!existingPermission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.'
            });
        }

        // Realiza la actualización del permiso
        const updatedPermission = await prisma.permission.update({
            where: {
                idPermission: permissionId
            },
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

        res.json(updatedPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un permiso
export async function deletePermission(req, res) {
    try {
        // Extrae el ID del permiso a eliminar desde los parámetros de la solicitud
        const permissionId = req.params.id; // Asumiendo que el ID del permiso se encuentra en los parámetros de la URL

        // Comprueba si el permiso con el ID proporcionado existe
        const existingPermission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!existingPermission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.'
            });
        }

        // Realiza la eliminación física del permiso
        await prisma.permission.delete({
            where: {
                idPermission: permissionId
            }
        });

        res.json({ message: 'El permiso ha sido eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Borrado lógico de un permiso
export async function softDeletePermission(req, res) {
    try {
        // Extrae el ID del permiso a desactivar desde los parámetros de la solicitud
        const permissionId = req.params.id; // Asumiendo que el ID del permiso se encuentra en los parámetros de la URL

        // Comprueba si el permiso con el ID proporcionado existe
        const existingPermission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!existingPermission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.'
            });
        }

        // Realiza el borrado lógico desactivando el permiso
        await prisma.permission.update({
            where: {
                idPermission: permissionId
            },
            data: {
                statusPermission: 'inactive' // Suponiendo que 'inactive' indica un permiso inactivo
            }
        });

        res.json({ message: 'El permiso ha sido desactivado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

