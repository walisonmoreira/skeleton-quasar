import Prototype from 'src/app/Prototype/Prototype'
import TestService from '../Service/TestService'
import { path } from '../Routes'

/**
 * @type {Test}
 */
export default class Test extends Prototype {
  /**
   * @type {string}
   */
  static path = path

  /**
   * @type {string}
   */
  static domain = 'example.test'

  /**
   * @type {string}
   */
  primaryKey = 'id'

  /**
   * @type {string}
   */
  displayKey = 'name'

  /**
   * @type {TestService}
   */
  service = TestService.build()

  /**
   * Test constructor.
   */
  construct () {
    this.fieldAsPrimaryKey()

    this.addField('name')
      .fieldTableShow()
      .fieldFormWidth(50)
      .fieldFormAutofocus()
      .fieldOn('input', function () {
        // console.log('~> arguments', arguments)
      })

    this.addField('age')
      .fieldIsNumber()
      .fieldRequired()
      .fieldFormWidth(50)

    this.addField('description')
      .fieldIsText()

    this.action('edit')
      .actionConfigure(this.configureHideEditOnEven)
  }

  /**
   * @param {Object} button
   * @param {string} scope
   * @param {string} position
   * @param {Object} context
   * @returns {*}
   */
  configureHideEditOnEven (button, { scope, position, context }) {
    // this.$log({ scope, position })

    // if is not grid, avoid
    if (scope !== 'index' || position !== 'table-cell') {
      return button
    }

    // hidden button if id is even
    const record = this.$util.prop(context, 'record', {})
    if (record.id % 2 === 0) {
      button.hidden = true
    }
    return button
  }
}
