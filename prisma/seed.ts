import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Aplicativos
    // -------------------------------------------------------------------------
    const dataApps = [
      {
        id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        nome: 'Authentication',
        slug: 'authentication'
      },
      {
        id: '1ae3dff1-82fc-4a48-890f-27e577ae4203',
        nome: 'Intranet',
        slug: 'intranet'
      },
      {
        id: '6d832a48-3760-4bca-a280-62863f840644',
        nome: 'Painel Gov',
        slug: 'painelgov'
      },
      {
        id: '58e4a6c0-53bf-4ced-b3de-5a9532972239',
        nome: 'GTRel',
        slug: 'gtrel'
      }
    ]
    const apps = await Promise.all(
      dataApps.map(async (app) => {
        const res = await prisma.aplicativos.upsert({
          where: { id: app.id },
          update: {},
          create: app
        })
        if (res) return res
        else console.error('Erro ao criar aplicativo. ID: ' + app.id)
      })
    )
    console.log({ apps })

    // Entidades
    // -------------------------------------------------------------------------
    const dataEntidades = [
      {
        id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        nome: 'Aspec',
        doc: '02288268000104'
      }
    ]
    const entidades = await Promise.all(
      dataEntidades.map(async (item) => {
        const res = await prisma.entidades.upsert({
          where: { id: item.id },
          update: {},
          create: item
        })
        if (res) return res
        else console.error('Erro ao criar entidade. ID: ' + item.id)
      })
    )
    console.log({ entidades })

    // Acoes
    // -------------------------------------------------------------------------
    const dataAcoes = [
      {
        id: '33c0515a-74f7-4773-8c6c-1d174c6763ba',
        nome: 'Listar usuários',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios',
        method: 'GET'
      },
      {
        id: 'd66d8765-4450-4265-abcb-89e1c116fe18',
        nome: 'Filtrar usuários',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios/filter',
        method: 'POST'
      },
      {
        id: '2b36cdf1-38c9-42ea-baf3-cde00a823b35',
        nome: 'Carregar usuário',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios/<id>',
        method: 'GET'
      },
      {
        id: 'a275b323-bbe0-4896-aacd-38a016b79f00',
        nome: 'Criar usuário',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios',
        method: 'POST'
      },
      {
        id: '28359d85-44c6-4d29-a2ed-411b0dcde9fe',
        nome: 'Atualizar usuário',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios/<id>',
        method: 'PUT'
      },
      {
        id: '83348924-574a-46c4-ac75-d16a969afb6e',
        nome: 'Deletar usuário',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        path: '/usuarios/<id>',
        method: 'DELETE'
      }
    ]
    const acoes = await Promise.all(
      dataAcoes.map(async (action) => {
        const res = await prisma.acoes.upsert({
          where: { id: action.id },
          update: {},
          create: action
        })
        if (res) return res
        else console.error('Erro ao criar ação. ID: ' + action.id)
      })
    )
    console.log({ acoes })

    // Usuarios
    // -------------------------------------------------------------------------
    const root = await prisma.usuarios.upsert({
      where: { id: '28595aed-992b-432f-87a2-438396344ed2' },
      update: {},
      create: {
        id: '28595aed-992b-432f-87a2-438396344ed2',
        nome: 'Root',
        login: 'root',
        email: 'admin@aspec.com.br',
        doc: '00123456789',
        pass: '$2b$10$mdXQWq/Ed80Ermq2.PfYpOYP.gSd1hd8pfkEUExMkbtv.wUCg.2lq'
        // posts: {
        //   create: {
        //     title: 'Check out Prisma with Next.js',
        //     content: 'https://www.prisma.io/nextjs',
        //     published: true,
        //   },
        // },
      }
    })
    console.log({ root })

    // Permissoes
    // -------------------------------------------------------------------------
    const dataPermissoes = [
      {
        id: 'db48ff1e-2385-40c5-b5ce-145a21b5f8db',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: '33c0515a-74f7-4773-8c6c-1d174c6763ba'
      },
      {
        id: 'f5592328-bf30-491e-8b52-11a53faf48c1',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: 'd66d8765-4450-4265-abcb-89e1c116fe18'
      },
      {
        id: 'eda8130c-93d8-43f0-b4bd-bce60c7f2aab',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: '2b36cdf1-38c9-42ea-baf3-cde00a823b35'
      },
      {
        id: '51b76080-c86c-495d-acfa-2f34d5c60097',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: 'a275b323-bbe0-4896-aacd-38a016b79f00'
      },
      {
        id: 'bd6b7fc2-d29d-40de-ad63-576191ef34b2',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: '28359d85-44c6-4d29-a2ed-411b0dcde9fe'
      },
      {
        id: 'c344e8e7-cd52-4086-8928-9ffaa5092b46',
        usuario_id: '28595aed-992b-432f-87a2-438396344ed2',
        aplicativo_id: 'e8ab1bf7-aee4-43dc-8128-cd9380106c6e',
        entidade_id: 'c6cde6f6-185f-4fc5-b241-9913253f4cc6',
        acao_id: '83348924-574a-46c4-ac75-d16a969afb6e'
      }
    ]
    const permissoes = await Promise.all(
      dataPermissoes.map(async (permission) => {
        const res = await prisma.permissoes.upsert({
          where: { id: permission.id },
          update: {},
          create: permission
        })
        if (res) return res
        else console.error('Erro ao criar permissão. ID: ' + permission.id)
      })
    )
    console.log({ permissoes })

    // END SEED
    // -------------------------------------------------------------------------
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
