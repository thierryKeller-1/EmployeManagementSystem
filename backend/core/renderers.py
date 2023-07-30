from rest_framework import renderers


class UserRender(renderers.JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return super().render(data, accepted_media_type, renderer_context)