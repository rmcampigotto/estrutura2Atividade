arquivo = open("palavras_chaves.txt", "r")

conteudo = arquivo.read()
class No:
    def __init__(self, palavraNo):
        self.palavra = palavraNo
        self.left = None
        self.right = None


class Arvore:
    def __init__(self):
        self.raiz = None

    def inserir(self, palavra):
        novoNo = No(palavra)

        if self.raiz is None:
            self.raiz = novoNo
        else:
            self.inserir_no(self.raiz, novoNo)

    def inserir_no(self, no, novoNo):
        if novoNo.palavra < no.palavra:
            if no.left is None:
                no.left = novoNo
            else:
                self.inserir_no(no.left, novoNo)
        else:
            if no.right is None:
                no.right = novoNo
            else:
                self.inserir_no(no.right, novoNo)

    def procurar(self, palavra):
        return self.procurar_no(self.raiz, palavra)

    def procurar_no(self, no, palavra):
        if no is None:
            return f"\tPalavra NÃO Encontrada! ;"
        elif palavra < no.palavra:
            return self.procurar_no(no.left, palavra)
        elif palavra > no.palavra:
            return self.procurar_no(no.right, palavra)
        else:
            return f"\tPalavra Encontrada!: {no.palavra} ;"


arvore = Arvore()

for palavra in conteudo.splitlines(keepends=False):
    arvore.inserir(palavra)

print(arvore)


opcao = int(input("\n1-PROCURAR\n2-SAIR\nESCOLHA: "))

while opcao == 1:
    palavraBusca = input("Insira a palavra que deseja buscar: ")

    print(arvore.procurar(palavraBusca))

    opcao = int(input("\n1-PROCURAR\n2-SAIR\nESCOLHA: "))

    if opcao == 2:
        print("Fim do programa!")
    else:
        if opcao != 1:
            print("Opção inválida! Finalizando o programa")

arquivo.close()
