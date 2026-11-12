'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Sparkles,
  Gift,
  Calendar,
  MapPin,
  ChevronLeft,
  CreditCard,
  Star,
  MessageCircle,
  Trash2,
} from 'lucide-react';

// WhatsApp Oficial Petit Marie (55 + DDD 19 + 98937-8971)
const NUMERO_WHATSAPP = '5519989378971';

interface ProdutoItem {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  destaque?: boolean;
  tag?: string;
  imagem?: string;
}

interface CategoriaCardapio {
  id: string;
  categoria: string;
  subtitulo?: string;
  icone: string;
  itens: ProdutoItem[];
}

const CARDAPIO_NATAL: CategoriaCardapio[] = [
  {
    id: 'chocotones',
    categoria: 'Chocotones Artesanais',
    subtitulo: 'Todos finalizados com cobertura de chocolate nobre',
    icone: '🎄',
    itens: [
      {
        id: '1',
        nome: 'Chocotone 500 g',
        descricao: 'Massa artesanal fofinha com cobertura de chocolate nobre',
        preco: 59.9,
      },
      {
        id: '2',
        nome: 'Mini chocotone 120 g',
        descricao: 'Ideal para presentear • Cobertura de chocolate nobre',
        preco: 19.9,
      },
      {
        id: '3',
        nome: 'Chocotone trufado 900 g',
        descricao: 'Super recheado com cobertura de chocolate nobre',
        preco: 109.9,
        destaque: true,
        tag: 'Mais Pedido',
      },
    ],
  },
  {
    id: 'panetones',
    categoria: 'Panetones Tradicionais',
    subtitulo: 'Frutas cristalizadas selecionadas e receita especial',
    icone: '✨',
    itens: [
      { id: '4', nome: 'Panetone 500 g', preco: 49.9 },
      { id: '5', nome: 'Mini panetone 100 g', preco: 15.9 },
    ],
  },
  {
    id: 'tortas',
    categoria: 'Tortas Especiais',
    subtitulo: 'Perfeitas para a sobremesa da ceia',
    icone: '🥧',
    itens: [
      { id: '6', nome: 'Torta Banoffee', preco: 159.9, destaque: true, tag: 'Sucesso' },
      { id: '7', nome: 'Torta de Limão', preco: 149.9 },
      { id: '8', nome: 'Torta de Morango', preco: 179.9 },
      { id: '9', nome: 'Torta de Maracujá', preco: 165.0 },
    ],
  },
  {
    id: 'sobremesas',
    categoria: 'Sobremesas na Travessa',
    subtitulo: 'Porções generosas para compartilhar',
    icone: '🍮',
    itens: [
      { id: '10', nome: 'Bombom de Uva', preco: 160.0 },
      { id: '11', nome: 'Bombom de Morango', preco: 170.0, destaque: true, tag: 'Clássico' },
      { id: '12', nome: 'Pudim Tradicional', preco: 70.0 },
      { id: '13', nome: 'Manjar de Coco', preco: 80.0 },
    ],
  },
  {
    id: 'bolos',
    categoria: 'Bolos Festivos',
    subtitulo: 'Peso aproximado de 3 kg • Serve muito bem a família',
    icone: '🎂',
    itens: [
      { id: '14', nome: 'Folhado de Morango', descricao: 'Aprox. 3 kg', preco: 360.0 },
      {
        id: '15',
        nome: 'Bolo Matilda',
        descricao: 'Aprox. 3 kg • Chocolatudo intenso',
        preco: 360.0,
        destaque: true,
        tag: 'Especial',
      },
      { id: '16', nome: 'Matilda com Morango', descricao: 'Aprox. 3 kg', preco: 360.0 },
      { id: '17', nome: 'Pudim com Doce de Leite', descricao: 'Aprox. 3 kg', preco: 320.0 },
    ],
  },
  {
    id: 'mimos',
    categoria: 'Mimos & Lembrancinhas',
    subtitulo: 'Opções delicadas para presentear pessoas queridas',
    icone: '🎁',
    itens: [
      { id: '18', nome: 'Brownie Artesanal', preco: 18.0 },
      { id: '19', nome: 'Pão de Mel Recheado', preco: 14.5 },
      { id: '20', nome: 'Cone Trufado', preco: 18.0 },
    ],
  },
  {
    id: 'salgados',
    categoria: 'Salgados para a Ceia',
    subtitulo: 'Praticidade e sabor artesanal para sua mesa',
    icone: '🍽️',
    itens: [
      { id: '21', nome: 'Empadão Frango com Catupiry', preco: 95.8, destaque: true, tag: 'Ceia' },
      { id: '22', nome: 'Empadão de Palmito', preco: 86.0 },
      { id: '23', nome: 'Salpicão Especial (1 kg)', preco: 109.9 },
    ],
  },
];

interface CartMap {
  [key: string]: {
    produto: ProdutoItem;
    quantidade: number;
  };
}

export default function CardapioNatalPetitMarie() {
  const [carrinho, setCarrinho] = useState<CartMap>({});
  const [etapa, setEtapa] = useState<'cardapio' | 'dados'>('cardapio');
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('chocotones');

  // Dados do Cliente
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalidade, setModalidade] = useState<'retirada' | 'entrega'>('retirada');
  const [endereco, setEndereco] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [observacoes, setObservacoes] = useState('');

  const alterarQuantidade = (produto: ProdutoItem, delta: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id]?.quantidade || 0;
      const novaQtd = atual + delta;

      if (novaQtd <= 0) {
        const copy = { ...prev };
        delete copy[produto.id];
        return copy;
      }
      return {
        ...prev,
        [produto.id]: { produto, quantidade: novaQtd },
      };
    });
  };

  const limparCarrinho = () => {
    if (confirm('Deseja limpar todos os itens selecionados?')) {
      setCarrinho({});
    }
  };

  const cartList = Object.values(carrinho);
  const totalItens = cartList.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = cartList.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  const itensDestaque = CARDAPIO_NATAL.flatMap((c) => c.itens).filter((i) => i.destaque);

  const formatarMoeda = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const irParaCategoria = (id: string) => {
    setCategoriaAtiva(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const enviarPedidoWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) {
      alert('Por favor, preencha seu nome e WhatsApp.');
      return;
    }

    if (modalidade === 'entrega' && !endereco.trim()) {
      alert('Por favor, informe o endereço para entrega.');
      return;
    }

    let msg = `🎄✨ *ENCOMENDA DE NATAL - PETIT MARIE* ✨🎄\n`;
    msg += `────────────────────\n\n`;
    msg += `👤 *Cliente:* ${nome}\n`;
    msg += `📱 *WhatsApp:* ${telefone}\n`;
    msg += `📦 *Recebimento:* ${modalidade === 'entrega' ? 'Entrega 🛵' : 'Retirada no local 🛍️'}\n`;

    if (modalidade === 'entrega' && endereco) {
      msg += `📍 *Endereço:* ${endereco}\n`;
    }
    if (dataEntrega) {
      msg += `📅 *Data desejada:* ${dataEntrega.split('-').reverse().join('/')}\n`;
    }
    msg += `💳 *Pagamento:* ${formaPagamento}\n`;

    msg += `\n🎁 *ITENS DO PEDIDO:*\n`;
    cartList.forEach((item) => {
      const sub = item.produto.preco * item.quantidade;
      msg += `• *${item.quantidade}x* ${item.produto.nome} — ${formatarMoeda(sub)}\n`;
    });

    if (observacoes.trim()) {
      msg += `\n📝 *Observações:* ${observacoes}\n`;
    }

    msg += `\n────────────────────\n`;
    msg += `💰 *VALOR TOTAL: ${formatarMoeda(valorTotal)}*\n`;
    msg += `────────────────────\n`;
    msg += `_Aguardo confirmação da disponibilidade e dados para sinal!_ ✨`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.location.href = url;
  };

  const abrirDuvidaWhatsApp = () => {
    const texto = 'Olá, Petit Marie! 🎄 Estou vendo o Cardápio de Natal e gostaria de tirar uma dúvida.';
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#EFE5DA] text-[#4A120E] pb-32 relative overflow-x-hidden">
      {/* Faixa Festiva Superior */}
      <div className="bg-gradient-to-r from-[#4A0D09] via-[#7A1812] to-[#4A0D09] text-[#F9E79F] text-center py-2.5 px-4 text-xs font-medium tracking-wider flex items-center justify-center gap-2 shadow-md border-b border-[#EBC351]/50">
        <Sparkles className="w-3.5 h-3.5 text-[#EBC351] shrink-0" />
        <span>ENCOMENDAS DE NATAL PETIT MARIE • PRODUÇÃO ARTESANAL LIMITADA</span>
        <Sparkles className="w-3.5 h-3.5 text-[#EBC351] shrink-0" />
      </div>

      {/* Cabeçalho Boutique com Logo em Destaque */}
      <header className="bg-white border-b-2 border-[#EBC351] shadow-sm relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute top-5 left-[8%] text-[#EBC351]/60 text-2xl">✦</span>
          <span className="absolute top-16 left-[18%] text-[#7A1812]/15 text-lg">❄</span>
          <span className="absolute top-6 right-[10%] text-[#EBC351]/60 text-2xl">✦</span>
          <span className="absolute top-20 right-[16%] text-[#7A1812]/15 text-xl">🎄</span>
        </div>

        <div className="max-w-2xl mx-auto px-4 pt-6 pb-5 flex flex-col items-center text-center relative z-10">
          <img
            src="/logo-petit-marie.png"
            alt="Petit Marie - Seu doce é uma ordem"
            className="h-44 sm:h-56 w-auto object-contain mx-auto mb-2"
          />

          <div className="inline-flex items-center gap-2 bg-[#7A1812] text-[#F9E79F] text-xs uppercase tracking-[0.2em] px-5 py-2 rounded-full font-bold shadow-sm border border-[#EBC351]">
            <Gift className="w-3.5 h-3.5 text-[#EBC351]" />
            <span>Coleção Natal 2026</span>
          </div>

          <p className="text-xs sm:text-sm text-[#5C110D]/80 mt-3 max-w-md leading-relaxed">
            Escolha suas delícias por categoria abaixo e finalize seu pedido organizado direto no nosso WhatsApp.
          </p>
        </div>

        {/* Barra de Navegação Fixa por Categorias */}
        {etapa === 'cardapio' && (
          <nav className="border-t border-[#EBC351]/50 bg-[#FAF5F0] sticky top-0 z-20 shadow-sm">
            <div className="max-w-2xl mx-auto px-3 py-2.5 flex gap-2 overflow-x-auto no-scrollbar">
              {CARDAPIO_NATAL.map((cat) => {
                const ativo = categoriaAtiva === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => irParaCategoria(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      ativo
                        ? 'bg-[#7A1812] text-[#F9E79F] shadow-sm ring-1 ring-[#EBC351]'
                        : 'bg-white text-[#7A1812] border border-[#EBC351]/60 hover:bg-[#7A1812]/10'
                    }`}
                  >
                    <span>{cat.icone}</span>
                    <span>{cat.categoria}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-2xl mx-auto px-3 sm:px-4 mt-6">
        {etapa === 'cardapio' ? (
          <div className="space-y-8">
            {/* Vitrine Especial: Queridinhos do Natal */}
            <section className="bg-gradient-to-br from-[#5C110D] via-[#7A1812] to-[#4A0D09] rounded-3xl p-5 text-white shadow-md border-2 border-[#EBC351]/70">
              <div className="mb-3.5">
                <span className="text-[10px] uppercase tracking-widest text-[#EBC351] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#EBC351]" /> Sugestões da Chef
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F9E79F]">
                  Queridinhos do Natal ✨
                </h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {itensDestaque.map((item) => {
                  const qtd = carrinho[item.id]?.quantidade || 0;
                  return (
                    <div
                      key={item.id}
                      className="min-w-[200px] bg-white/10 backdrop-blur-xs border border-[#EBC351]/40 rounded-2xl p-3.5 flex flex-col justify-between shrink-0"
                    >
                      <div>
                        <span className="inline-block bg-[#EBC351] text-[#4A120E] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mb-1.5">
                          {item.tag || 'Destaque'}
                        </span>
                        <h3 className="font-bold text-sm text-white leading-snug">
                          {item.nome}
                        </h3>
                        <p className="text-base font-extrabold text-[#F9E79F] mt-1">
                          {formatarMoeda(item.preco)}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/15">
                        {qtd > 0 ? (
                          <div className="flex items-center gap-2 bg-white text-[#7A1812] rounded-lg px-2 py-1 w-full justify-between">
                            <button
                              type="button"
                              onClick={() => alterarQuantidade(item, -1)}
                              className="p-0.5 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-extrabold">{qtd} no pedido</span>
                            <button
                              type="button"
                              onClick={() => alterarQuantidade(item, 1)}
                              className="p-0.5 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(item, 1)}
                            className="w-full py-1.5 bg-[#EBC351] hover:bg-[#f3d16b] text-[#4A120E] font-extrabold text-xs rounded-lg flex items-center justify-center gap-1 transition-transform active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" /> Adicionar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CATEGORIAS EM BLOCOS SEPARADOS COM DIVISÃO CLARA */}
            {CARDAPIO_NATAL.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-16 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/40 overflow-hidden"
              >
                {/* Cabeçalho da Categoria (Faixa Bordô de Separação) */}
                <div className="bg-gradient-to-r from-[#7A1812] to-[#5C110D] px-5 py-3.5 border-b-2 border-[#EBC351] flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#F9E79F] flex items-center gap-2">
                      <span>{cat.icone}</span>
                      <span>{cat.categoria}</span>
                    </h2>
                    {cat.subtitulo && (
                      <p className="text-xs text-[#F9E79F]/80 mt-0.5">{cat.subtitulo}</p>
                    )}
                  </div>
                  <span className="text-[11px] font-bold bg-[#EBC351]/20 text-[#F9E79F] border border-[#EBC351]/40 px-2.5 py-1 rounded-full shrink-0">
                    {cat.itens.length} {cat.itens.length === 1 ? 'opção' : 'opções'}
                  </span>
                </div>

                {/* Lista de Itens da Categoria com Divisórias Bem Marcadas */}
                <div className="divide-y divide-[#EBC351]/35">
                  {cat.itens.map((prod) => {
                    const qtd = carrinho[prod.id]?.quantidade || 0;
                    return (
                      <div
                        key={prod.id}
                        className={`p-4 sm:px-5 transition-colors flex items-center justify-between gap-3 ${
                          qtd > 0 ? 'bg-[#FDF6EC]' : 'hover:bg-[#FAF5F0]/60'
                        }`}
                      >
                        {/* Lado Esquerdo: Informações do Produto */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {prod.imagem ? (
                            <img
                              src={prod.imagem}
                              alt={prod.nome}
                              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EBC351]/50"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-[#FAF5F0] border border-[#EBC351]/50 flex items-center justify-center text-lg shrink-0 mt-0.5">
                              {cat.icone}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="font-bold text-sm sm:text-base text-[#4A120E]">
                                {prod.nome}
                              </h3>
                              {prod.destaque && (
                                <span className="bg-[#EBC351]/30 text-[#7A1812] border border-[#D4AF37]/50 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                                  {prod.tag || 'Favorito'}
                                </span>
                              )}
                            </div>

                            {prod.descricao && (
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                {prod.descricao}
                              </p>
                            )}

                            <p className="text-sm sm:text-base font-extrabold text-[#7A1812] mt-1">
                              {formatarMoeda(prod.preco)}
                            </p>
                          </div>
                        </div>

                        {/* Lado Direito: Botões de Quantidade */}
                        <div className="shrink-0">
                          {qtd > 0 ? (
                            <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border-2 border-[#7A1812] shadow-xs">
                              <button
                                type="button"
                                onClick={() => alterarQuantidade(prod, -1)}
                                aria-label="Remover um"
                                className="w-8 h-8 flex items-center justify-center bg-[#FAF5F0] text-[#7A1812] rounded-lg active:scale-95 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-extrabold w-6 text-center text-[#7A1812]">
                                {qtd}
                              </span>
                              <button
                                type="button"
                                onClick={() => alterarQuantidade(prod, 1)}
                                aria-label="Adicionar mais um"
                                className="w-8 h-8 flex items-center justify-center bg-[#7A1812] text-white rounded-lg active:scale-95 hover:bg-[#5C110D]"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => alterarQuantidade(prod, 1)}
                              className="px-3.5 py-2 flex items-center gap-1 bg-[#FAF5F0] hover:bg-[#7A1812] text-[#7A1812] hover:text-[#F9E79F] border border-[#7A1812]/30 text-xs font-bold rounded-xl transition-colors active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" /> Adicionar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Etapa 2: Resumo + Formulário de Finalização */
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEtapa('cardapio')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7A1812] hover:underline bg-white px-3 py-1.5 rounded-full border border-[#EBC351]/50"
              >
                <ChevronLeft className="w-4 h-4" /> Voltar ao cardápio
              </button>

              <button
                type="button"
                onClick={() => {
                  limparCarrinho();
                  setEtapa('cardapio');
                }}
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline bg-white px-3 py-1.5 rounded-full border border-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" /> Limpar cesta
              </button>
            </div>

            {/* Resumo dos Itens Escolhidos */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#D4AF37]/50 overflow-hidden">
              <div className="bg-[#7A1812] px-5 py-3 border-b-2 border-[#EBC351]">
                <h2 className="text-base font-serif font-bold text-[#F9E79F] flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#EBC351]" /> Resumo da sua Encomenda
                </h2>
              </div>

              <div className="p-5">
                <ul className="divide-y divide-gray-100 text-sm">
                  {cartList.map((item) => (
                    <li key={item.produto.id} className="py-2.5 flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#7A1812] text-[#F9E79F] text-xs font-bold px-2 py-0.5 rounded-md">
                          {item.quantidade}x
                        </span>
                        <span className="text-[#4A120E] font-medium">{item.produto.nome}</span>
                      </div>
                      <span className="font-bold text-[#4A120E] shrink-0">
                        {formatarMoeda(item.produto.preco * item.quantidade)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t-2 border-dashed border-[#EBC351] flex justify-between items-center">
                  <span className="font-bold text-sm text-[#7A1812]">Total Estimado</span>
                  <span className="text-xl font-extrabold text-[#7A1812]">
                    {formatarMoeda(valorTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Formulário de Dados */}
            <form
              onSubmit={enviarPedidoWhatsApp}
              className="bg-white rounded-3xl shadow-sm border border-[#D4AF37]/50 overflow-hidden"
            >
              <div className="bg-[#7A1812] px-5 py-3 border-b-2 border-[#EBC351]">
                <h2 className="text-base font-serif font-bold text-[#F9E79F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EBC351]" /> Seus Dados para Contato
                </h2>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#7A1812] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome"
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A1812] mb-1">
                    Seu WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(19) 99999-9999"
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A1812] mb-1">
                    Como deseja receber?
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setModalidade('retirada')}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        modalidade === 'retirada'
                          ? 'bg-[#7A1812] text-[#F9E79F] border-[#7A1812] shadow-xs'
                          : 'bg-[#FAF5F0] text-[#7A1812] border-gray-200'
                      }`}
                    >
                      🛍️ Retirada no local
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalidade('entrega')}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        modalidade === 'entrega'
                          ? 'bg-[#7A1812] text-[#F9E79F] border-[#7A1812] shadow-xs'
                          : 'bg-[#FAF5F0] text-[#7A1812] border-gray-200'
                      }`}
                    >
                      🛵 Entrega
                    </button>
                  </div>
                </div>

                {modalidade === 'entrega' && (
                  <div>
                    <label className="text-xs font-bold text-[#7A1812] mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Endereço Completo para Entrega *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Rua, número, bairro e cidade"
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#7A1812] mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Data Desejada
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                      value={dataEntrega}
                      onChange={(e) => setDataEntrega(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#7A1812] mb-1 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" /> Forma de Pagamento
                    </label>
                    <select
                      value={formaPagamento}
                      onChange={(e) => setFormaPagamento(e.target.value as 'Pix' | 'Cartão' | 'Dinheiro')}
                      className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                    >
                      <option value="Pix">Pix</option>
                      <option value="Cartão">Cartão de Crédito / Débito</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A1812] mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Horário aproximado, embalagem para presente, recado no cartão..."
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7A1812] bg-[#FAF5F0]/50"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" /> Enviar Pedido no WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Botão Flutuante de Dúvidas */}
      {totalItens === 0 && (
        <button
          type="button"
          onClick={abrirDuvidaWhatsApp}
          className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold z-30 transition-transform active:scale-95"
        >
          <MessageCircle className="w-4 h-4" /> Dúvidas? Fale conosco
        </button>
      )}

      {/* Rodapé Natalino */}
      <footer className="max-w-2xl mx-auto px-4 mt-14 text-center text-xs text-[#7A1812]/70 space-y-1.5">
        <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
          <span>✦</span>
          <span>🎄</span>
          <span>✦</span>
        </div>
        <p className="font-serif font-bold text-sm text-[#7A1812]">
          Petit Marie • Seu doce é uma ordem
        </p>
        <p>Encomendas sujeitas à disponibilidade de agenda • Natal 2026</p>
      </footer>

      {/* Barra Fixa Inferior de Resumo do Pedido */}
      {totalItens > 0 && etapa === 'cardapio' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#EBC351] p-3.5 shadow-[0_-6px_25px_rgba(74,18,14,0.14)] z-30">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-gray-500 font-medium block">
                {totalItens} {totalItens === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
              <span className="text-xl font-extrabold text-[#7A1812]">
                {formatarMoeda(valorTotal)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEtapa('dados');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-[#5C110D] via-[#7A1812] to-[#5C110D] hover:opacity-95 text-[#F9E79F] px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md border border-[#EBC351] transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#EBC351]" /> Revisar e Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}