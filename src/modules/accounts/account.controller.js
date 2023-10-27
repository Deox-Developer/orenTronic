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

// crear una cuenta

export async function updateAccount(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            accountId, // Asumiendo que recibes el ID de la cuenta a actualizar
            userName,
            password,
            nameOne,
            nameSecond,
            lastNameOne,
            lastNameSecond,
            permissionId, // Asumiendo que recibes el ID del permissions
            email,
            numIdentification,
            birthdate,
            catalogId // Asumiendo que recibes el ID del catálogo
        } = req.body;

        // Verifica si el campo accountId está presente
        if (!accountId) {
            return res.status(400).json({
                message: 'Se requiere el ID de la cuenta para la actualización.'
            });
        }

        // Comprueba si la cuenta con el ID proporcionado existe
        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        // Comprueba si el permissions con el ID proporcionado existe
        const permission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!permission) {
            return res.status(400).json({
                message: 'El permiso especificado no existe.'
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

        // Realiza la actualización de la cuenta
        const updatedAccount = await prisma.account.update({
            where: {
                idAccount: accountId
            },
            data: {
                userName,
                password,
                nameOne,
                nameSecond,
                lastNameOne,
                lastNameSecond,
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

        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// funcón para eliminar

export async function deleteAccount(req, res) {
    try {
        // Extrae el ID de la cuenta a eliminar desde los parámetros de la solicitud
        const accountId = req.params.id; // Asumiendo que el ID de la cuenta se encuentra en los parámetros de la URL

        // Comprueba si la cuenta con el ID proporcionado existe
        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        // Realiza la eliminación de la cuenta
        await prisma.account.delete({
            where: {
                idAccount: accountId
            }
        });

        res.json({ message: 'La cuenta ha sido eliminada con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//borrado lógico
export async function softDeleteAccount(req, res) {
    try {
        // Extrae el ID de la cuenta a desactivar desde los parámetros de la solicitud
        const accountId = req.params.id; // Asumiendo que el ID de la cuenta se encuentra en los parámetros de la URL

        // Comprueba si la cuenta con el ID proporcionado existe
        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        // Realiza el borrado lógico desactivando la cuenta
        await prisma.account.update({
            where: {
                idAccount: accountId
            },
            data: {
                statusAccount: 'inactive' // Suponiendo que 'inactive' indica una cuenta inactiva
            }
        });

        res.json({ message: 'La cuenta ha sido desactivada con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

