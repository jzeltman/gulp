var React = require( 'react' );

export class TodoForm extends React.Component {
    render() {
        return (
            <form>
                <input type='text' ref='todoName' />
                <button>Add</button>
            </form>
        )
    }
}
