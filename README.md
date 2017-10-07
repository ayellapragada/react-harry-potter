This is a simple, easy, and in progress, React Form Wizard.

It allows you to handle multiple steps and is useful to capture user
information.


Have the Wizard component wrap around all the individual components you want as
screens.

Each individual screen component needs a unique name, and needs to be exported
using the Persist HoC to keep track of their state as you progress through the
wizard.
