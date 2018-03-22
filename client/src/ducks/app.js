
export const TOGGLE_FULL_SCREEN = 'dd/app/toggle-full-screen'
export const SET_WIDGETS = 'dd/app/set-widgets'
export const SET_WIDGET_DATA = 'dd/app/set-widget-data'




export default (state = { fullScreen: false, loading: true, widgets: [] }, action) => {
  switch(action.type){
    case TOGGLE_FULL_SCREEN:
      return Object.assign({}, state, { fullScreen: !state.fullScreen })
    case SET_WIDGETS:
      return {...state, loading: false, widgets: action.widgets.slice()}
    case SET_WIDGET_DATA:
      const widgets = state.widgets.map((widget) => ({...widget}))
      widgets[action.id].data = action.data

      return { ...state, widgets, lastReload: new Date() }

    default:
      return state
  }
}


export const requestDataFetch = (id) => (dispatch) => {
  fetch(`/api/widgets/${id}/exec`)
    .then((res) => res.json())
    .then((data) => dispatch({ type: SET_WIDGET_DATA, id, data }))
}

export const toggleFullScreen = () => (dispatch, getState) => {
  if(getState().app.fullScreen)
    document.webkitExitFullscreen()
  else
    document.documentElement.webkitRequestFullscreen()

  dispatch({ type: TOGGLE_FULL_SCREEN })
}


export const loadWidgets = () => (dispatch) => {
  fetch('/api/widgets')
    .then((res) => res.json())
    .then((widgets) => dispatch({ type: SET_WIDGETS, widgets }))

}
