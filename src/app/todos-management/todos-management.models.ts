export namespace TodosManagement {
    export interface Todo {
        id: string;
        title: string;
        description: string;
        done: false;
    }
}

export namespace Index {

}

export namespace TodoList {

    export type EditorMode = 'create' | 'update';

    export interface ViewModel {
        todos: TodosManagement.Todo[];
        isEditorOpen: boolean;
        editorMode: EditorMode;
        defaultFormValues: TodosManagement.Todo | null;
    }
}