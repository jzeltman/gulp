var React       = require( 'react' );
var TodoView    = require( './apps/views/todo' ).TodoView;
var TodoForm    = require( './apps/views/form' ).TodoForm;
var todoModel   = require( './apps/models/todo' ).Todo;

var model = new todoModel({ 
    title : 'testing',
    id    : 1234567890,
    status : false
});

class App extends React.Component {
    render(){
        return (
            <div id='todo-app'>
                <TodoForm />
                <ul id='todo-list'>
                    <TodoView model={model} />
                </ul>
            </div>
        )
    }
}
React.render(<App />, document.getElementById('app'));
