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