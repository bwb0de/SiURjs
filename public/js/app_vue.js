      var app = new Vue({
        el: "#app",
        data: {
          novoitem: '',
          novoitem_peso: '',
          novoitem_dano: '',
          itens: [],
          novanota: '',
          notas: []
        },
        delimiters: ["?{", "}"],
        methods: {
          readNotas() {
            file_ref = document.getElementById("page_ref").value;
            fetch(`/ler_notas/${file_ref}`)
            .then((res) => res.json())
            .then((data) => this.notas = data);
          },

          readItens() {
            file_ref = document.getElementById("page_ref").value;
            fetch(`/ler_itens/${file_ref}`)
            .then((res) => res.json())
            .then((data) => this.itens = data);
          },

          addToEquipo(event) {
            fetch('/adicionar_item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'},
               body: JSON.stringify({item: { nome: this.novoitem, peso: this.novoitem_peso, dano: this.novoitem_dano } })
            })
            .then((res) => res.text())
            .then((data) => console.log(data));
            this.itens.push({ nome: this.novoitem, peso: this.novoitem_peso, dano: this.novoitem_dano });
            this.novoitem = '';
            this.novoitem_peso = '';
            this.novoitem_dano = '';
          },

          addToNotes(event) {
              fetch('/adicionar_nota', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-type': 'application/json'},
                 body: JSON.stringify({nota: { nome: this.novanota } })
              })
              .then((res) => res.text())
              .then((data) => console.log(data));
              this.notas.push({ nome: this.novanota });
              this.novanota = '';
          },

          delEquipo(item) {
            fetch('/remover_item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/jason, text/plain, */*',
                    'Content-type': 'application/json'},
               body: JSON.stringify({item: item})
            })
            .then((res) => res.text())
            .then((data) => console.log(data));            
            const itemIdx = this.itens.indexOf(item);
            this.itens.splice(itemIdx, 1);
          }, 

          delNote(nota) {
            fetch('/remover_nota', {
                method: 'POST',
                headers: {
                    'Accept': 'application/jason, text/plain, */*',
                    'Content-type': 'application/json'},
               body: JSON.stringify({nota: nota})
            })
            .then((res) => res.text())
            .then((data) => console.log(data));
            const notaIdx = this.notas.indexOf(nota);
            this.notas.splice(notaIdx, 1);
          }
        },
        
        //Vue Hooks
        created() {
          this.readItens();
          this.readNotas();
        }

      });