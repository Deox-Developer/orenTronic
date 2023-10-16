import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Envia todas las cuentas

export async function getAccount(req, res) {
    try {
        const accounts = await prisma.account.findMany()
        res.json(accounts)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// crear una cuenta

export async function createAccount(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            userName,
            password,
            nameOne,
            nameSecond,
            lastNameOne,
            lasNameSecond,
            permissionId, // Asumiendo que recibes el ID del permissions
            email,
            numIdentification,
            birthdate,
            catalogId // Asumiendo que recibes el ID del catálogo
        } = req.body;

        // Verifica si los campos obligatorios están presentes
        if (!userName || !password || !numIdentification || !email) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

        // Comprueba si el permissions con el ID proporcionado existe
        const permission = await prisma.permission.findUnique({
            where: {
                ipPermission: permissionId
            }
        });

        if (!permission) {
            return res.status(400).json({
                message: 'El catálogo especificado no existe.'
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

        const newAccount = await prisma.account.create({
            data: {
                userName,
                password,
                nameOne,
                nameSecond,
                lastNameOne,
                lasNameSecond,
                email,
                numIdentification,
                birthdate,
                catalog: {
                    connect: {
                        idCatalog: catalogId
                    }
                },
                permission: {
                    connect: {
                        idPermission: permissionId
                    }

                }
            }
        });
        res.json(newAccount);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}