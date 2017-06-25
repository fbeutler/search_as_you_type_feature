@app.route('/search_job_market', methods=['POST'])
def search_job_market():
    ''' 
    We get here if the user types into the job market search field
    '''
    if request.method == 'POST': 
        html = get_job_market_table_html(request.json)
        return json.dumps({'success': 'search successful', 'html': html, 'timestamp': request.json['timestamp']}), 200, {'ContentType':'application/json'}
