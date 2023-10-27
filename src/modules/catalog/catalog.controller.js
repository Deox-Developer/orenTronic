import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Envia todas los catálogos

export async function getCatalog(req, res) {
    try {
        const catalogs = await prisma.catalog.findMany()
        res.json(catalogs)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// crear una catálogo


export async function createCatalog(req, res) {
    try {
        const { typeCatalog, nameCatalog } = req.body;

        if (!typeCatalog || !nameCatalog) {
            return res.status(400).json({
                message: 'typeCatalog y nameCatalog son campos obligatorios.'
            });
        }

        const newCatalog = await prisma.catalog.create({
            data: {
                typeCatalog,
                nameCatalog
            }
        });

        res.json(newCatalog);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar un catálogo
export async function updateCatalog(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            catalogId, // Asumiendo que recibes el ID del catálogo a actualizar
            typeCatalog,
            nameCatalog
        } = req.body;

        // Verifica si el campo catalogId está presente
        if (!catalogId) {
            return res.status(400).json({
                message: 'Se requiere el ID del catálogo para la actualización.'
            });
        }

        // Comprueba si el catálogo con el ID proporcionado existe
        const existingCatalog = await prisma.catalog.findUnique({
            where: {
                idCatalog: catalogId
            }
        });

        if (!existingCatalog) {
            return res.status(404).json({
                message: 'El catálogo especificado no existe.'
            });
        }

        // Realiza la actualización del catálogo
        const updatedCatalog = await prisma.catalog.update({
            where: {
                idCatalog: catalogId
            },
            data: {
                typeCatalog,
                nameCatalog
            }
        });

        res.json(updatedCatalog);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un catálogo
export async function deleteCatalog(req, res) {
    try {
        // Extrae el ID del catálogo a eliminar desde los parámetros de la solicitud
        const catalogId = req.params.id; // Asumiendo que el ID del catálogo se encuentra en los parámetros de la URL

        // Comprueba si el catálogo con el ID proporcionado existe
        const existingCatalog = await prisma.catalog.findUnique({
            where: {
                idCatalog: catalogId
            }
        });

        if (!existingCatalog) {
            return res.status(404).json({
                message: 'El catálogo especificado no existe.'
            });
        }

        // Realiza la eliminación física del catálogo
        await prisma.catalog.delete({
            where: {
                idCatalog: catalogId
            }
        });

        res.json({ message: 'El catálogo ha sido eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Borrado lógico de un catálogo
export async function softDeleteCatalog(req, res) {
    try {
        // Extrae el ID del catálogo a desactivar desde los parámetros de la solicitud
        const catalogId = req.params.id; // Asumiendo que el ID del catálogo se encuentra en los parámetros de la URL

        // Comprueba si el catálogo con el ID proporcionado existe
        const existingCatalog = await prisma.catalog.findUnique({
            where: {
                idCatalog: catalogId
            }
        });

        if (!existingCatalog) {
            return res.status(404).json({
                message: 'El catálogo especificado no existe.'
            });
        }

        // Realiza el borrado lógico desactivando el catálogo
        await prisma.catalog.update({
            where: {
                idCatalog: catalogId
            },
            data: {
                statusCatalog: 'inactive' // Suponiendo que 'inactive' indica un catálogo inactivo
            }
        });

        res.json({ message: 'El catálogo ha sido desactivado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
