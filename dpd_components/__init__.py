import os as _os
import dash as _dash
import sys as _sys
from .version import __version__

_current_path = _os.path.dirname(_os.path.abspath(__file__))

_components = _dash.development.component_loader.load_components(
    _os.path.join(_current_path, 'metadata.json'),
    'dpd_components'
)

_this_module = _sys.modules[__name__]


_js_dist = [
    {
        "relative_package_path": "bundle.js",
        "external_url": (
            "https://unpkg.com/dpd-components@{}"
            "/dpd_components/bundle.js"
        ).format(__version__),
        "namespace": "dpd_components"
    }
]

_css_dist = []


for _component in _components:

    if _component.__name__ == 'Pipe':
        class WrappedPipe(_component):
            def __init__(self,**kwargs):
                uid = kwargs.get('uid',None)
                if uid is None:
                    import uuid
                    kwargs['uid'] = str(uuid.uuid4())
                super(WrappedPipe, self).__init__(**kwargs)
        WrappedPipe.__name__ = 'Pipe'
        _component = WrappedPipe

    setattr(_this_module, _component.__name__, _component)
    setattr(_component, '_js_dist', _js_dist)
    setattr(_component, '_css_dist', _css_dist)
