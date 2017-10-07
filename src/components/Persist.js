let WrapWithLocalStorate = Component => {
  const { name } = Component;

  class SessionStorageComponent extends Component {

    componentWillMount(){
      this.setState( JSON.parse( sessionStorage.getItem( name )));
    }

    componentWillUpdate( nextProps, nextState ){
      sessionStorage.setItem( name, JSON.stringify( nextState ));
    }

  }

  SessionStorageComponent.displayName = name;

  return SessionStorageComponent;

};


export default WrapWithLocalStorate;
