import React from "react";

export const TaskInput = () => {
    return(
       <form>
        <input type="text" placeholder="Digite uma tarefa" />
        <button type="submit">Adicionar</button>
       </form>
    );
}