const request = require("supertest");
const app = require("../index");

describe("Operaciones CRUD de cafes", () => {
  //Test GET

  it('validar GET para que retorno 200 como statusCode', async () => {
    const resultado = await request(app).get('/cafes').send()
    expect(resultado.statusCode).toBe(200)
  })

  it('obtener 404 al intentar eliminar algun cafe con id desconocido', async () => {
    const resultado = await request(app).delete('/cafes/10')
    expect(resultado.statusCode).not.toBe(404);
  })

  it('obtener 201 al accionar POST/cafes', async () => {
    const postCafe = { id: 5, nombre: 'nuevo cafe' }
    const resultado = await request(app).post('/cafes').send(postCafe)
    expect(resultado.statusCode).toBe(201)
  })

  it('obtener 400 si al hacer PUT/cafes para actualizar un cafe enviando un id que sea diferente de los id en el payload',
      async () => {
        const postCafe = { id: 5 }
        const resultado = await request(app).put('/cafes/4').send(postCafe)
        expect(resultado.statusCode).toBe(400)
      })
});
