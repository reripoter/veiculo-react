//Crud
//Pesquisa - Read

import { useEffect, useState } from "react"
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import styles from './Veiculo.module.css'
import api from "../service/api"


function Veiculo() {
  let [veiculos, setVeiculos] = useState([])
  let [marca, setMarca] = useState("")
  let [modelo, setModelo] = useState("")
  let [ano, setAno] = useState("")
  let [placa, setPlaca] = useState("")

  async function salvar() {

    let veiculo = {

      marca: marca,
      modelo: modelo,
      ano: Number(ano),
      placa: placa,
    }

    const resposta = await api.post('/veiculos', veiculo)
      .catch((e) => {
        alert(e.response.data.msg)
      })
    veiculos.push(resposta.data)

    setVeiculos([...veiculos])


    limparForm()

  }
  function limparForm() {
    setMarca("")
    setModelo("")
    setAno("")
    setPlaca("")


  }

  async function excluir(veiculo) {


   const resposta = await api.delete(`/veiculos/${veiculo.placa}`)
   
   
    veiculos.forEach((v, i) => {
      if (resposta.data.placa == v.placa) {

        veiculos.splice(i, 1)


      }

    })
    setVeiculos([...veiculos])
  }

  useEffect(() => {

    buscarVeiculos()

  }, [])

  async function buscarVeiculos() {

    const resposta = await api.get('/veiculos')
    alert(resposta.status)

    setVeiculos(resposta.data)


  }

  return (
    <div className={styles.main}>

      <h1>Veiculo</h1>
      <Form.Control
        value={placa}
        onChange={(e) => { setPlaca(e.target.value) }}
        placeholder="placa"
        aria-label="placa"
        aria-describedby="basic-addon1"
      />


      <Form.Control
        value={marca}
        onChange={(e) => { setMarca(e.target.value) }}
        placeholder="Marca"
        aria-label="Marca"
        aria-
        describedby="basic-addon1"
      />
      <Form.Control
        value={modelo}
        onChange={(e) => { setModelo(e.target.value) }}
        placeholder="Modelo"
        aria-label="Modelo"
        aria-describedby="basic-addon1"
      />
      <Form.Control
        value={ano}
        onChange={(e) => { setAno(e.target.value) }}
        placeholder="Ano"
        aria-label="Ano"
        aria-describedby="basic-addon1"
      />


      <Button onClick={salvar}>Salvar</Button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>Placa</td>
            <td>Marca</td>
            <td>Modelo</td>
            <td>Ano</td>

            <td></td>
          </tr>
        </thead>

        {/* <tr>
          <td>Ralf</td>
          <td>26</td>
          <td>Designer</td>
          <td>Estudante</td>
        </tr> */}
        <tbody>
          {
            veiculos.map((veiculo, i) => {

              return (

                <tr key={i}>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.marca}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.ano}</td>
                  <td>
                    <button onClick={() => { excluir(veiculo) }}>X</button>
                  </td>
                </tr>

              )

            })

          }
        </tbody>
      </Table>

    </div>
  )
}

export default Veiculo
