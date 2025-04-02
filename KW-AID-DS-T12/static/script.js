$(document).ready(function() {
    // Form submission for prediction
    $('#prediction-form').on('submit', function(e) {
        e.preventDefault();
        
        const text = $('#text-input').val().trim();
        if (!text) {
            showAlert('Please enter a product description to classify', 'warning');
            return;
        }
        
        // Show loading state
        $('#predict-btn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Predicting...');
        $('#predict-btn').prop('disabled', true);
        
        // Make API call
        $.ajax({
            url: '/predict',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ text: text }),
            success: function(response) {
                displayResults(response);
                
                // Show success message
                showAlert('Prediction completed successfully!', 'success');
            },
            error: function(xhr) {
                const errorMsg = xhr.responseJSON ? xhr.responseJSON.error : 'An error occurred';
                showAlert('Error: ' + errorMsg, 'danger');
            },
            complete: function() {
                // Reset button state
                $('#predict-btn').html('<i class="fas fa-magic me-2"></i>Predict Category');
                $('#predict-btn').prop('disabled', false);
            }
        });
    });
    
    // Display prediction results
    function displayResults(response) {
        // Show results container
        $('#results-container').removeClass('d-none').addClass('fade-in');
        
        // Update prediction text
        $('#prediction-result').text(response.prediction);
        
        // Scroll to results
        $('html, body').animate({
            scrollTop: $('#results-container').offset().top - 100
        }, 500);
    }
    
    // Toggle advanced options
    $('#toggle-advanced').on('click', function() {
        const $advanced = $('#advanced-container');
        const $button = $(this);
        
        if ($advanced.hasClass('d-none')) {
            $advanced.removeClass('d-none').addClass('fade-in');
            $button.html('<i class="fas fa-cog me-2"></i>Hide Model Details');
        } else {
            $advanced.addClass('d-none');
            $button.html('<i class="fas fa-cog me-2"></i>Show Model Details');
        }
    });
    
    // Load model info if on the index page
    if ($('#model-info-container').length > 0) {
        loadModelInfo();
    }
    
    // Load model info
    function loadModelInfo() {
        $.ajax({
            url: '/model_info',
            type: 'GET',
            success: function(response) {
                // Update model info
                $('#model-type').text(response.model_type || 'Loigistic Regression Model (Bag of Words)');
                $('#vocabulary-size').text(response.vocabulary_size?.toLocaleString() || '5,243 terms');
                
                // Update classes list
                const $classesList = $('#classes-list');
                $classesList.empty();
                
                const categories = response.classes || [
                    'Electronics', 
                    'Clothing', 
                    'Home & Kitchen', 
                    'Books', 
                    'Toys', 
                    'Sports & Outdoors', 
                    'Beauty & Personal Care'
                ];
                
                categories.forEach(function(className) {
                    $classesList.append(`<li>${className}</li>`);
                });
            },
            error: function(xhr) {
                // Use default values if API fails
                $('#model-type').text('Multinomial Naive Bayes (Bag of Words)');
                $('#vocabulary-size').text('5,243 terms');
                
                const defaultCategories = [
                    'Electronics', 
                    'Clothing', 
                    'Home & Kitchen', 
                    'Books', 
                    'Toys', 
                    'Sports & Outdoors', 
                    'Beauty & Personal Care'
                ];
                
                const $classesList = $('#classes-list');
                $classesList.empty();
                
                defaultCategories.forEach(function(className) {
                    $classesList.append(`<li>${className}</li>`);
                });
            }
        });
    }
    
    // Show alert function
    function showAlert(message, type) {
        // Create alert element
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Prepend to form
        $('#prediction-form').before(alertHtml);
        
        // Auto dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').alert('close');
        }, 5000);
    }
    
    // Demo functionality for when the API is not available
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
        console.log('Running in demo mode');
        
        // Override form submission for demo
        $('#prediction-form').off('submit').on('submit', function(e) {
            e.preventDefault();
            
            const text = $('#text-input').val().trim();
            if (!text) {
                showAlert('Please enter a product description to classify', 'warning');
                return;
            }
            
            // Show loading state
            $('#predict-btn').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Predicting...');
            $('#predict-btn').prop('disabled', true);
            
            // Simulate API delay
            setTimeout(function() {
                // Determine category based on keywords (simple demo)
                let prediction = 'Other';
                
                const textLower = text.toLowerCase();
                
                if (textLower.includes('phone') || textLower.includes('laptop') || textLower.includes('computer') || textLower.includes('camera')) {
                    prediction = 'Electronics';
                } else if (textLower.includes('shirt') || textLower.includes('shoe') || textLower.includes('dress') || textLower.includes('jacket')) {
                    prediction = 'Clothing';
                } else if (textLower.includes('book') || textLower.includes('novel') || textLower.includes('textbook')) {
                    prediction = 'Books';
                } else if (textLower.includes('kitchen') || textLower.includes('cookware') || textLower.includes('furniture')) {
                    prediction = 'Home & Kitchen';
                } else if (textLower.includes('toy') || textLower.includes('game') || textLower.includes('doll')) {
                    prediction = 'Toys';
                }
                
                // Display results
                displayResults({
                    prediction: prediction
                });
                
                // Reset button state
                $('#predict-btn').html('<i class="fas fa-magic me-2"></i>Predict Category');
                $('#predict-btn').prop('disabled', false);
                
                // Show success message
                showAlert('Demo prediction completed!', 'success');
            }, 1500);
        });
    }
    
    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animation for cards
    function animateCards() {
        $('.info-card, .team-card').each(function() {
            const cardPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height() - 100;
            
            if (scrollPosition > cardPosition) {
                $(this).addClass('fade-in');
            }
        });
    }
    
    // Run animation on scroll
    $(window).on('scroll', animateCards);
    
    // Run once on page load
    animateCards();
});