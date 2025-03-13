document.addEventListener('DOMContentLoaded', function() {
    // Âm thanh nền
    const bgMusic = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/birthday.mp3');
    bgMusic.loop = true;
    let isMusicPlaying = false;
    
    // Các hiệu ứng âm thanh
    const doorSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/door.mp3');
    const clickSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/click.mp3');
    const wishSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/sparkle.mp3');
    const giftSound = new Audio('https://cdnjs.cloudflare.com/ajax/libs/sound-effects/1.0.1/gift.mp3');
    
    // Điều khiển âm thanh
    const toggleAudio = document.getElementById('toggle-audio');
    toggleAudio.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            toggleAudio.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            bgMusic.play();
            toggleAudio.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Mở cánh cửa
    const doorContainer = document.getElementById('door-container');
    const openDoorBtn = document.getElementById('open-door');
    const universe = document.getElementById('universe');
    
    openDoorBtn.addEventListener('click', function() {
        clickSound.play();
        doorContainer.classList.add('opening');
        doorSound.play();
        
        setTimeout(function() {
            doorContainer.classList.remove('active');
            doorContainer.classList.add('hidden');
            universe.classList.remove('hidden');
            
            // Bắt đầu phát nhạc nền
            if (!isMusicPlaying) {
                bgMusic.play();
                isMusicPlaying = true;
            }
        }, 2000);
    });
    
    // Điều hướng giữa các hành tinh và phần
    const planets = document.querySelectorAll('.planet');
    const sections = document.querySelectorAll('.section');
    const backBtns = document.querySelectorAll('.back-btn');
    
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            clickSound.play();
            const section = planet.getAttribute('data-section');
            document.getElementById(`${section}-section`).classList.remove('hidden');
            
            // Nếu là phần thư, bắt đầu hiệu ứng đánh máy
            if (section === 'letter') {
                startTypingEffect();
            }
        });
    });
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            clickSound.play();
            const parent = btn.closest('.section');
            parent.classList.add('hidden');
            universe.classList.remove('hidden');
        });
    });
    
    document.getElementById("show-video").addEventListener("click", function() {
        document.getElementById("video-popup").classList.remove("hidden");
    });
    
    document.querySelector(".close-video").addEventListener("click", function() {
        document.getElementById("video-popup").classList.add("hidden");
    });

    // Hiệu ứng đánh máy cho lá thư
    function startTypingEffect() {
        const textElement = document.getElementById('typing-text');
        const text = `Chúc mừng sinh nhật em yêu! Hôm nay là một ngày đặc biệt không chỉ vì đây là sinh nhật của em, mà còn vì anh muốn tạo ra một kỷ niệm thật khó quên cho chúng ta.

Mỗi ngày bên cạnh em là một ngày đáng trân trọng đối với anh. Nụ cười của em làm sáng cả thế giới của anh. Anh biết ơn vì được gặp em, được yêu em và được em yêu.

Năm nay, anh muốn tạo ra điều gì đó đặc biệt, một vũ trụ nhỏ chỉ dành riêng cho em. Hãy khám phá từng hành tinh, mỗi nơi sẽ có một điều bất ngờ anh dành tặng cho em.

Anh yêu em thật nhiều, hôm nay và mãi mãi về sau.`;
        
        let index = 0;
        textElement.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 30);
            }
        }
        
        typeWriter();
    }
    
    // Xử lý lá thư và điều ước
    const wishButton = document.querySelector('.wish-button');
    const wishPopup = document.getElementById('wish-popup');
    const closeWish = document.querySelector('.close-wish');
    
    wishButton.addEventListener('click', function() {
        wishSound.play();
        wishPopup.classList.remove('hidden');
    });
    
    closeWish.addEventListener('click', function() {
        clickSound.play();
        wishPopup.classList.add('hidden');
    });
    
    // Xử lý phần kỷ niệm
    const memoryPoints = document.querySelectorAll('.memory-point');
    const memoryDetail = document.getElementById('memory-detail');
    const closeMemory = document.querySelector('.close-memory');
    const currentMemoryImg = document.getElementById('current-memory-img');
    const memoryDescription = document.getElementById('memory-description');
    
    // Dữ liệu kỷ niệm
    const memories = [
        {
            image: 'images/henhodacbiet.jpg',
            description: 'Đây là lần đầu tiên chúng ta gặp nhau, tại công viên. Anh đã yêu em từ đây Baby à.'
        },
        {
            image: 'images/rapphim.jpg',
            description: 'Chuyến đi đầu tiên của chúng ta. Nhớ không? Chúng ta đã cùng nhau lạc đường, nhưng lại tìm thấy quán ăn ngon nhất từ trước đến nay.'
        },
        {
            image: 'images/anhminhhoa1.jpg',
            description: 'Kỷ niệm 1 năm của chúng ta. Anh đã cố gắng làm một chiếc bánh (khá thảm họa), nhưng may mắn là em vẫn yêu anh sau đó.'
        },
        {
            image: 'images/henhodacbiet.jpg',
            description: 'Sinh nhật em năm ngoái. Em trông thật xinh đẹp. Mỗi năm trôi qua, anh lại càng yêu em nhiều hơn.'
        }
    ];
    
    memoryPoints.forEach((point, index) => {
        point.addEventListener('click', function() {
            clickSound.play();
            currentMemoryImg.src = memories[index].image;
            memoryDescription.textContent = memories[index].description;
            memoryDetail.classList.remove('hidden');
        });
    });
    
    closeMemory.addEventListener('click', function() {
        clickSound.play();
        memoryDetail.classList.add('hidden');
    });
    
    // Xử lý video đặc biệt
    const showVideoBtn = document.getElementById('show-video');
    const videoPopup = document.getElementById('video-popup');
    const closeVideo = document.querySelector('.close-video');
    
    showVideoBtn.addEventListener('click', function() {
        clickSound.play();
        videoPopup.classList.remove('hidden');
    });
    
    closeVideo.addEventListener('click', function() {
        clickSound.play();
        videoPopup.classList.add('hidden');
    });
    
    // Xử lý các game
    const gameCards = document.querySelectorAll('.game-card');
    const gameContents = document.querySelectorAll('.game-content');
    const backToGamesButtons = document.querySelectorAll('.back-to-games');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            clickSound.play();
            const gameId = card.id;
            document.querySelector('.games-container').classList.add('hidden');
            
            if (gameId === 'puzzle-game') {
                document.getElementById('puzzle-container').classList.remove('hidden');
                startPuzzleGame();
            } else if (gameId === 'treasure-game') {
                document.getElementById('treasure-container').classList.remove('hidden');
                startTreasureGame();
            } else if (gameId === 'wheel-game') {
                document.getElementById('wheel-container').classList.remove('hidden');
            }
        });
    });
    
    backToGamesButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            clickSound.play();
            gameContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.querySelector('.games-container').classList.remove('hidden');
        });
    });
    
    // Trò chơi Puzzle
    function startPuzzleGame() {
        const questions = [
            'Ngày chúng ta bắt đầu hẹn hò là ngày nào?',
            'Món ăn yêu thích của em là gì?',
            'Anh thường gọi em bằng biệt danh gì?',
            'Đâu là bộ phim đầu tiên chúng ta cùng xem?'
        ];
        
        const answers = [
            '26/03/2019', // Thay đổi theo ngày thật
            'gỏi cuốn', // Thay đổi theo món ăn thật
            'BaBy', // Thay đổi theo biệt danh thật
            'Nhà Bà nữ' // Thay đổi theo bộ phim thật
        ];
        
        let currentQuestionIndex = 0;
        let overlay = document.querySelector('.puzzle-overlay');
        let currentOpacity = 1;
        const questionElement = document.getElementById('current-question');
        const answerInput = document.getElementById('puzzle-answer');
        const submitButton = document.getElementById('submit-answer');
        
        function setQuestion() {
            questionElement.textContent = questions[currentQuestionIndex];
        }
        
        setQuestion();
        
        submitButton.addEventListener('click', checkAnswer);
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
        
        function checkAnswer() {
            const userAnswer = answerInput.value.toLowerCase().trim();
            if (userAnswer === answers[currentQuestionIndex].toLowerCase()) {
                wishSound.play();
                currentOpacity -= 0.25;
                overlay.style.opacity = currentOpacity;
                
                answerInput.value = '';
                currentQuestionIndex++;
                
                if (currentQuestionIndex < questions.length) {
                    setQuestion();
                } else {
                    questionElement.textContent = 'Chúc mừng! Em đã hoàn thành câu đố!';
                    answerInput.style.display = 'none';
                    submitButton.style.display = 'none';
                }
            } else {
                answerInput.value = '';
                answerInput.placeholder = 'Sai rồi, thử lại nào...';
                setTimeout(() => {
                    answerInput.placeholder = 'Nhập câu trả lời...';
                }, 2000);
            }
        }
    }
    
    // Trò chơi Kho báu
    function startTreasureGame() {
        const dragItems = document.querySelectorAll('.drag-item');
        const dropZones = document.querySelectorAll('.drop-zone');
        let correctDrops = 0;
        
        dragItems.forEach(item => {
            item.addEventListener('dragstart', dragStart);
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', dragOver);
            zone.addEventListener('dragenter', dragEnter);
            zone.addEventListener('dragleave', dragLeave);
            zone.addEventListener('drop', drop);
        });
        
        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-item'));
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        }
        
        function dragOver(e) {
            e.preventDefault();
        }
        
        function dragEnter(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        }
        
        function dragLeave() {
            this.classList.remove('drag-over');
        }
        
        function drop(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const draggedItemId = e.dataTransfer.getData('text/plain');
            const dropZoneId = this.getAttribute('data-item');
            
            if (draggedItemId === dropZoneId) {
                const draggedItem = document.querySelector(`[data-item="${draggedItemId}"]`);
                this.appendChild(draggedItem);
                draggedItem.setAttribute('draggable', 'false');
                draggedItem.classList.add('dropped');
                correctDrops++;
                
                wishSound.play();
                
                if (correctDrops === dropZones.length) {
                    setTimeout(() => {
                        document.getElementById('treasure-message').classList.remove('hidden');
                    }, 1000);
                }
            }
        }
    }
    
    // Vòng quay may mắn
    const spinWheelBtn = document.getElementById('spin-wheel');
    const wheelContent = document.querySelector('.wheel-content');
    const wheelResult = document.getElementById('wheel-result');
    const resultText = document.getElementById('result-text');
    
    spinWheelBtn.addEventListener('click', function() {
        clickSound.play();
        spinWheelBtn.disabled = true;
        
        const items = document.querySelectorAll('.wheel-item');
        const degree = 1800 + Math.floor(Math.random() * 360);
        
        wheelContent.style.transition = 'all 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        wheelContent.style.transform = `rotate(${degree}deg)`;
        
        setTimeout(() => {
            const winningIndex = Math.floor((360 - (degree % 360)) / (360 / items.length));
            resultText.textContent = items[winningIndex % items.length].textContent;
            wheelResult.classList.remove('hidden');
            wishSound.play();
        }, 4500);
    });
    
    // Món quà bí mật
    const openGiftBtn = document.getElementById('open-gift');
    const giftBox = document.querySelector('.gift-box');
    const giftContent = document.getElementById('gift-content');
    const futureBtn = document.getElementById('future-btn');
    const futureMessage = document.getElementById('future-message');
    
    openGiftBtn.addEventListener('click', function() {
        giftSound.play();
        giftBox.classList.add('opening');
        
        setTimeout(() => {
            giftBox.style.display = 'none';
            openGiftBtn.style.display = 'none';
            giftContent.classList.remove('hidden');
        }, 2000);
    });
    
    futureBtn.addEventListener('click', function() {
        wishSound.play();
        futureMessage.classList.remove('hidden');
    });
});
