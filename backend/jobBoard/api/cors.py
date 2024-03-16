class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"
        response["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
        return response