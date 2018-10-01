(function(){
  angular.module('Example').controller('CadastroController',[
    '$http',
    '$location',
    'message',
    'tabsFactory',
    CadastroCtrl,
  ])
  function CadastroCtrl($http, $location, msgs, tabs){
    const vm = this
    const urlConsulta = 'http://localhost:8080/rest/pessoas'
    const urlConsultaPorChavePrimaria = 'http://localhost:8080/rest/pessoa'
    const urlSave = 'http://localhost:8080/rest/pessoa/save'
    const urlDelete = 'http://localhost:8080/rest/pessoa/remove'

    vm.refresh = function(){

      $http.get(urlConsulta).then(function(response) {
        vm.pessoas = [{}]
        vm.pessoas = response.data
        tabs.show(vm, { tabList:true })
      })
    }

    vm.retrieve = function(p){
      const url = `${urlConsultaPorChavePrimaria}/${p.cpf}`
      $http.get(url).then(function(response) {
      vm.pessoa = response.data
      })
    }

    vm.erase = function(){
      vm.pessoa = {}
    }

     vm.create = function(p){
       const url = `${urlSave}/${p.cpf}`

       if(p.tipoLogradouro == 'RUA'){
         p.tipoLogradouro = 0
       }
       if(p.tipoLogradouro == 'AVENIDA'){
         p.tipoLogradouro = 1
       }

      $http.post(url, p).then(function(response) {
        vm.refresh()
        vm.pessoa = {}
        msgs.addSucesso("Incluido com sucesso!")
      }).catch(function(response){
        msgs.addErros(response.data.error)
      })
    }

    vm.delete = function(p){
         const url = `${urlDelete}/${p.cpf}`

         if(p.tipoLogradouro === 'RUA'){
           p.tipoLogradouro = 1
         }
         if(p.tipoLogradouro === 'AVENIDA'){
           p.tipoLogradouro = 2
         }

         $http.delete(url, p).then(function(response) {
           vm.refresh()
           msgs.addSucesso("Eliminado com sucesso!")
         }).catch(function(response){
           msgs.addErros(response.data.error)
         })
    }

  
     vm.refresh()
   }
})()
