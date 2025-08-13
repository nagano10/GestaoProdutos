import { useEffect, useState } from 'react'
import './App.css'

type Produto = {
    id: string
    nome: string
    preco: number
    categoria: string
}

const API = import.meta.env.VITE_API_BASE as string

export default function App() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState<number | ''>('')
    const [categoria, setCategoria] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    async function carregar() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${API}/produto`)
            if (!res.ok) throw new Error(`Status ${res.status}`)
            const data = await res.json()
            setProdutos(data)
        } catch (e) {
            setError('Falha ao carregar produtos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { carregar() }, [])

    async function criar(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        if (!nome || !categoria || !preco) {
            setError('Preencha todos os campos')
            return
        }

        setSaving(true)
        try {
            const res = await fetch(`${API}/produto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, preco: Number(preco), categoria })
            })
            if (!res.ok) {
                const txt = await res.text()
                throw new Error(txt)
            }
            setNome(''); setPreco(''); setCategoria('')
            await carregar()
        } catch (e) {
            setError('Erro ao criar produto')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="app-container">
            <div className="card">
                <h1 className="titulo">Produtos</h1>

                <form onSubmit={criar} className="form-cadastro">
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="input-field"
                    />
                    <input
                        placeholder="Preço"
                        type="number"
                        step="0.01"
                        value={preco}
                        onChange={e => setPreco(e.target.value === '' ? '' : Number(e.target.value))}
                        className="input-field"
                    />
                    <input
                        placeholder="Categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" disabled={saving} className="submit-button">
                        {saving ? 'Salvando...' : 'Adicionar'}
                    </button>
                </form>

                {loading && <p className="mensagem-feedback">Carregando...</p>}
                {error && <p className="mensagem-feedback erro">{error}</p>}

                <ul className="lista-produtos">
                    {produtos.map(p => (
                        <li key={p.id} className="item-produto">
                            <div className="item-produto-header">
                                <strong>{p.nome}</strong>
                                <span>R$ {p.preco.toFixed(2)}</span>
                            </div>
                            <div className="item-produto-categoria">
                                Categoria: {p.categoria}
                            </div>
                        </li>
                    ))}
                </ul>

                {produtos.length === 0 && !loading && (
                    <p className="mensagem-feedback">Nenhum produto cadastrado.</p>
                )}
            </div>
        </div>
    )
}