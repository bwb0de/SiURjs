SiUR - Plataforma de Personagens
=======
O projeto em questão constitui uma das aplicações do ecosistema de SiUR que tem por finalidade possibilitar uma gestão e forma de acesso fácil à personagens de RPG. As informações dos personagens podem ser facilmente acessadas via navegador e a incllusão de notas rápidas se faz pela própria plataforma. Edições nas informações básicas dos personagens precisam ser feitas diretamente mediante a edição dos arquivos JSON gerados para cada um deles.

Novos personagens podem ser incluídos via linha de comando pelo script *mkplayer.py* ou mediante a cópia manual de um arquivo JSON existente e subsequente alteração de seu conteúdo. O uso do script requer a instalação do Python3.

A plataforma destina-se à pequenos grupos de RPG presencial dispensando mecanismos e, por este motivo, dispensa recursos mais avançados como mecanismos de login ou checagem estritas de segurança. O servidor pode precisa ser executado em dispositivo que esteja na rede local, compartilhada por todos os participantes. Pode ser executado em um computador de mesa, notebook, ou mesmo celular com OS android, via Termux. Até o momento foi testado apenas em Linux. 


### Instalação ###
As orientações a seguir partem do pressusposto que o usuário já possui o Node.JS e o NMP instalados em sua máquina. Após clonar o aplicativo será necessário realizar algumas configurações:

# Instalar as dependências.
Acesse o diretório raíz do aplicativo e execute:
`nmp install`

# Criar um arquivo de nome 'credencials.js'** no diretório raíz do projeto.
Este arquivo possui apenas uma linha e consiste em um código similar ao seguinte:
`module.exports = { cookieSecret: '**COLOCAR AQUI UMA STRING ALEATÓRIA LONGA**', };`

- - - - - -

Concluídos estes dois passos, acesse a raíz do aplicativo e execute:
`node index.js`

A plataforma estará acessível em **http://[IP_DA_MAQUINA_NA_REDE]:3000/**.

### Executando o aplicativo em um Smartphone ###

Os aplicativos Node.JS podem ser facilmente executados em um Smartphone. O objetivo dessa seção e mostrar como fazê-lo em dispositivos com o SO Android.

# Instale o **Termux**.
Ele pode ser facilmente encontrado nas lojas de aplicativo do seu dispositivo.

# Abra o Termux e Node.JS via linha de comando.

`apt install nodejs`

# Execute os passos da instalação padrão no dispositivo, via terminal Termux.

### Usando NGINX junto com Node.JS ###

Os procedimentos dessa seção não são necessários para executar a aplicação. O objetivo aqui é poder utilizar NGINX para servir conteúdo estático enquanto o Node.JS processa o conteúdo dinâmico. Isso assegura mais eficiência e velocidade no funcionamento da plataforma.

