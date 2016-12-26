import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'

import ReactTooltip from 'react-tooltip'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const multi_text = ReadJSON().static_text

const Config = () => (<span>
   <span data-tip={multi_text["config_text"]}>
   <FloatingActionButton
     disabled={true}
   >
     <ActionSettings />
   </FloatingActionButton>
  </span>
  <ReactTooltip place="bottom" type="error" effect="solid" offset={{ top: -28, left: -28}} />
</span>)

export default connect()(Config) 
