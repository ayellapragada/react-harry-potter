# React Harry Potter · [![npm version](https://badge.fury.io/js/react-harry-potter.svg)](https://badge.fury.io/js/react-harry-potter)

> "I solemnly swear I am up to no good."
>
> \-- _Harry Potter_


## What is this?
react-harry-potter is a React component library that helps you build a
multi-step control flow, otherwise known as a Wizard. 
You're responsible for actually building the screens, and then stating where you
want them to be placed, but beyond that react-harry-potter actually maintains
the flow-related state.

As a developer, you are given the power to interact with and control the 
Wizard using some easy functions from the 'nav' object that is passed down to 
all of it's children, you have some easy and required ones, and also some 
potentially dangerous ones. 

You have all the tools, I leave it up to you to use them properly (:

## Get Started
- run 
```
npm install --save react-harry-potter
```
- require into project, more specifics below
```jsx
import Wizard, { withPersist } from 'react-harry-potter';
```



### Building the Wizard itself
- import the Wizard
- import your components / screens that you want the wizard to render
```jsx
import Wizard  from 'react-harry-potter';
import { InputOne, InputTwo, InputThree } from './components';
```
- build your onComplete method that handles what you want to do with the data
```jsx
handleComplete(data) {
    console.log(data);
}
```
- actually build the wizard and render it somewhere
```jsx
<Wizard onComplete={this.handleComplete}>
    <InputOne>
    <InputTwo>
    <InputThree>
</Wizard>
```

### Modifying your components to work with the Wizard
- import the persist HoC and wrap them with it
- Call the allow function from the nav object somewhere appropriate

```jsx
import { withPersist } from 'react-harry-potter';

const InputOne = (props) => {
    props.nav.allow();

    return (
        <div> Screen One! </div>
    );
}

export default withPersist(InputOne);
```

## Example

```jsx
import React, { Component } from 'react';
import Wizard from 'react-harry-potter';

import { InputOne, InputTwo, InputThree } from './components';

class App extends Component {
  handleComplete(data) {
    // This is where you decide what to do with the data at the end. 
    // I'm logging it, but you could just as easily make a POST request with it.

    console.log(data);
  }

  render() {
    return (
      <Wizard onComplete={this.handleComplete}>
        <InputOne />
        <InputTwo />
        <InputThree />
      </Wizard>
    );
  }
}

export default App;
```

```jsx
import React, { Component } from 'react';
import { withPersist } from 'react-harry-potter';

class InputOne extends Component {
  constructor() {
    super();
    this.props.nav.allow();
  }

  render() {
    return (
        <div> Screen One </div>
    );
  }
}

export default withPersist(InputOne);
```


## `<Wizard>` API
### Required Props:
#### `onComplete(data)`: function
Used to explain what you want to do with the data, maybe log it or send a POST
request.


### Optional Props:
#### `start`: number, default: 0
Start the Wizard off at a different initial screen.

#### `showTextProgressBar`: bool, default: false
Show a "Step {current} out of {total}." progress indicator.

#### `showPercentageProgress`: bool, default: false
Show progress html element that uses the percentage completed so far.

#### `disallowEnterKey`: bool, default: false
Deny user the ability to press enter to try to move up in the Wizard.

#### `onCompleteText`: string, default: 'Thanks for completing!',
What to render once the user has finished the wizard.

#### `nextButtonText`: string, default: 'Next',
What to put in the text of the Next Button.

#### `prevButtonText`: string, default: 'Prev',
What to put in the text of the Prev Button.

#### `submitButtonText`: string, default: 'Submit',
What to put in the text of the Submit Button.

### CSS Props:
#### Pass in a style object to any of the following to change how they look.
```
containerStyle,
buttonNavContainerStyle,
buttonStyle,
prevButtonStyle,
nextButtonStyle,
submitButtonStyle,
textProgressStyle,
percentageProgressStyle
```


#### If not a fan of style objects, feel free to pass in CSS class names as well.
```
containerCls,
buttonNavContainerCls,
buttonCls,
prevButtonCls,
nextButtonCls,
submitButtonCls,
textProgressCls,
percentageProgressCls

```


## `<Child>` API
### Methods given to each `<Child>` element in a `<Wizard>`

Each Child is given a `nav` object that the developer can use to help create
their screens. If the screens have already been created it'll only take minor
modifications to use with the wizard.

#### `allow`:
- Activates the Next button to allow the user to move up in the component.
- You may want to call this in `componentDidUpdate` to verify the user has put in
all the data completely and accurately, if so they can move on in the Wizard.
- You may also want to just call it immediately in the constructor, to allow them
to move on immediately in case of optional fields.

#### `deny`:
- The opposite of allow, disabled the next button. Use as the second half of
  your `componentDidUpdate` check, where if they failed to complete or have an
  error somewhere, you can deny.

#### `allowBack` and `denyBack`:
- Similar to `allow` and `deny`, just for the Prev button.

#### `jump(componentName)`:
- Will find a component and jump to it specifically. 
- A bit dangerous to use since this won't cause the normal validation checks for
  Prev and Next.

#### `jumpToIndex(index)`:
- Will change to a specific index.
- Also a bit dangerous to use since this won't cause the normal validation checks for
  Prev and Next.
- Potentially more dangerous than jump, since this can't account for screen
  reorders.

#### `getAllData`:
- Gets all data for the Wizard as is.
- Maybe you want to show the user the data before they submit?

