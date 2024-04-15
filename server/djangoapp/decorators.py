from django.http import JsonResponse


def validate_dealer_id(func):
    def wrapper(request, dealer_id):
        if not dealer_id:
            return JsonResponse({'status': 400, 'message': 'Bad Request'})

        try:
            dealer_id = int(dealer_id)
        except ValueError:
            return JsonResponse({'status': 400, 'message': 'Invalid dealer ID'})

        return func(request, dealer_id)
    return wrapper
