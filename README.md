# trulator

## Rule engine for configurable views

### View Configuration

The idea for the view configuration is to have a general structure that represents the view model on one side and to have a configuration that defines available fields and rules for that view model on the other hand.
This means that a view is defined by the general structure of the view model and the view configuration allied to it.
A view contains all fields available in the general structure but which fields are being rendered is defined by the result of the view configuration's ruleset being applied to the general structure.
The product definition resembles the exact same structure as the general structure, but instead of the fields being actual client request data, they are Rule definitions for each specific field.

### Installation

Install package using
`yarn add trulator` or
`npm install trulator`

Import the types:
`import { RuleResult, ViewConfiguration } from '../../../src/types';`

To use the rule engine:
`import { evaluateRules } from 'trulator';`

To use the defaults mapper:
`import { mapDefaults } from 'trulator';`

### Rule Engine

Each field in the view configuration represents a rule that needs to be applied to that specific field.
A rule can contain the following:

- A default value
- Whether or not the field should be hidden
- Whether or not the field should be disabled
- Validation rules based on the model's current data resulting in a list of messages of different severity
- An override value that can (but doesn’t have to) be used in the view for that field as an output of some rule.
- A list of available options for a select list for example.

> Each rule can be either a constant value or be based on a calculation. The input for the calculation is always the full model, so that each individual field can evaluate every other field contained in the model

#### Example:

If you model looks like the following:
`export const testData: ViewModel = { amount: 1_000, }`

your view configuration would look like:

`export const viewConfiguration: ViewConfiguration<ViewModel, ViewModel> = { amount: { default: 123_456, disabled: true, hidden: (model): boolean => model.amount <= 4_000, validations: [ { message: { text: 'Amount too low', severity: 'Error' }, rule: (model): boolean => model.amount <= 5_000, }, { message: { text: 'Amount not equal 1234', severity: 'Warning' }, rule: (model): boolean => model.amount !== 1_234, }, ], },`

### TypeScript Implementation

Technically defining a view by a view configuration utilizes three data objects:

- One that represents the general data structure, the model
- One that represents the definition of the concrete model, the state
- One that contains the output of the rule engine run

Thanks to TypeScript all three data objects are forced to share the same structure/property tree. That means a view configuration needs to contain exactly the same fields the model type offers and the rule for each property needs to deal with exactly the type of the property itself.
The same goes for the result object except that instead of the fields containing rules they hold the outcome of the rule run on the data field itself.

Each rule gets the current model/state as an input and therefore can evaluate any combination of fields the model offers. The rule set can be run _after_ every mutation of the state. This ensures that all rules are always being evaluated based on the current input of the user.
