import dpd_components
import dash
import dash_html_components as html

app = dash.Dash('')

app.layout = html.Div([
    html.Div(id="output"),
    ])

@app.callback(
    dash.dependencies.Output('output', 'children'),
    [dash.dependencies.Input('output', 'style'),
     ])
def display_output(value):
    return "input value is %s" %value

app.scripts.config.serve_locally = True

app.run_server(debug=True,
               port=9987)
