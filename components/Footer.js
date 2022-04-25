export default function Footer() {
  return (
    <footer className="bg-white mt-4 border-t border-gray-300">
      <div className="flex flex-wrap items-center justify-items-center justify-center lg:container px-2 py-3 mx-auto md:flex-no-wrap md:px-2">
        <div className="grid mt-4 gap-2 md:grid-cols-1 lg:grid-cols-1">
          <div className="text-xs text-gray-600 text-center mt-6">
            <span>Todas as informações apresentadas tem caráter informativo e são provenientes de fontes públicas.
              Este site não se responsabiliza pelas decisões e caminhos tomados a partir da análise das informações aqui apresentadas.
            </span>
          </div>
          <div className="text-sm text-gray-600 text-center font-bold mt-6 mb-8">
            Política de Privacidade | Termos de uso
          </div>
        </div>
      </div>
    </footer>
  )
}