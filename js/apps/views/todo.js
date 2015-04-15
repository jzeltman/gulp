var React = require( 'react' );
var classNames = require( 'classnames' );


export class TodoView extends React.Component {
    constructor( props ){
        super ( props );
        console.log( props );
        this.model = props.model;
        this.state = { 
            title   : this.model.title,
            status  : this.model.status,
            editing : false
        };

    }
    render() {
        this.classes = classNames({
            'group' : true,
            'editing' : this.state.editing,
            'complete' : this.state.status
        });
        return (
            <li className={ this.classes }>
                <input type='checkbox' 
                        ref='checkbox'
                        onChange={ this.toggle.bind( this ) }
                        checked={ this.state.status } />
                <input type='text' 
                        ref='text'
                        defaultValue={ this.state.title }
                        onKeyDown={ this.onKeyDownHandler.bind( this ) } />
                <label onDoubleClick={ this.editHandler.bind( this ) }>
                    { this.model.title }
                </label>
                <button onClick={ this.editHandler.bind( this ) }
                        className='edit'>Edit</button>
                <button onClick={ this.submitHandler.bind( this ) }
                        className='update'>Update</button>
                <button onClick={ this.deleteHandler.bind( this ) }
                        className='delete'>Delete</button>
            </li>
        )
    }

    editHandler(){
        this.refs.text.getDOMNode().focus();
        this.setState({ 'editing' : true });
    }
    deleteHandler(){}

    toggle(e){
        console.log('e',e,e.target.checked);
        this.model.status = e.target.checked;
        console.log('toggle','model',this.model)
        this.setState({ status: e.target.checked });
    }

    submitHandler(){
        this.setState({ editing: false });
    }

    onKeyDownHandler(e){
        if ( e.which === 13 ){
            console.log('enter');
            this.model.title = e.target.value;
            this.setState({ 
                title   : e.target.value,
                editing : false
            });
        } else if ( e.which === 27 ){
            console.log('escape');
            this.setState({ 
                title   : this.model.title,
                editing : false
            });
        } else {
            console.log('else');
            this.setState({ title : e.target.value });
        }
    }
}
