<script lang="ts">
    import {createEventDispatcher, getContext} from 'svelte'
    interface IType{
        success:boolean;
        message:string;
        add:Omit<IType, 'add'>;
    }
  
    const d = getContext<Pick<IType, 'message'>>('props data')
    console.log(d.message)
  
    const dispatcher = createEventDispatcher<IType>()  // 여기 타입 어떻게 잡아야함..??
  
    function addAction(param){
      console.log(param)
  
      dispatcher('add', {
        success: true,
        message: 'call add',
      })
    }
  </script>
  
  <div>
    <button on:click={() => addAction(10)}>Add 10</button>
  </div>
  
  <style>
    
  </style>