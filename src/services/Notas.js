import { db } from './SQLite'

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Notas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionaNota({ titulo, categoria, texto }) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);", [titulo, categoria, texto], () => {
                resolve(console.log("Nota adicionada com sucesso!"))
            })
        })
    })
}

export async function filtraNotas(categoria) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Notas WHERE categoria = ?;",
                [categoria],
                (transaction, resultado) => {
                    resolve(resultado.rows._array)
                })
        })
    })
}

export async function buscaNotas() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Notas;",
                [],
                (transaction, resultado) => {
                    resolve(resultado.rows._array)
                })
        })
    })
}

export async function atualizaNota({ titulo, categoria, texto, id }) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [titulo, categoria, texto, id], () => {
                resolve(console.log("Nota atualizada com sucesso!"))
            })
        })
    })
}

export async function removeNota({ id }) {

    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [id], () => {
                resolve(console.log("Nota removida com sucesso!"))
            })
        })
    })
}
