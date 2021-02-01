/* ------ Exercises: Level 1 ------ */

// 1: What was your state today? Are you happy? I hope so. If you manage to make it this far you should be happy.
// Yes.

// 2: What is state in React ?
/*
React components has a built-in state object.
The state object is where you store property values that belongs to the component.
When the state object changes, the component re-renders.
*/

// 3: What is the difference between props and state in React?
/*
State is owned locally and updated by the component itself. Props are owned by a parent component and are read-only. Props can only be updated if a callback function is passed to the child to trigger an upstream change.
The state of a parent component can be passed a prop to the child. They are referencing the same value, but only the parent component can update it.
*/

// 4: How do you access state in a React component?
/*
---- State xxx  ---
Class Component: this.state.xxx
Functional Component: xxx
*/

// 5: How do you set a state in a React component?
/*
Class Component: this.setState({xxx: ''})
Functional Component: const [xxx, setXxx] = useState ('')
*/
