// ========================================
// GSAP Animation Functions
// ========================================
let funcObj = {
  
  // Section 0 - Hero
  f_0: function() {
    const tl = gsap.timeline();
    tl.to('#section0 .hero_content .badge', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
    .to('#section0 .hero_content h2.tit', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3')
    .to('#section0 .hero_content p.txt1', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3')
    .to('#section0 .search_box', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3')
    .to('#section0 .hero_img', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5')
    .to('#section0 .float_card', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    }, '-=0.4');
  },
  
  // Section 1 - About
  f_1: function() {
    const tl = gsap.timeline();
    // tit_wrap 자체를 먼저 보이게
    tl.to('#section1 .tit_wrap', {
      opacity: 1,
      y: 0,
      duration: 0.1,
    })
    .to('#section1 .tit_wrap > *', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    })
    .to('#section1 .about_list > li', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
    }, '-=0.3');
  },
  
  // Section 2 - Mood Matching
  f_2: function() {
    const tl = gsap.timeline();
    
    // tit_wrap 애니메이션
    tl.to('#section2 .tit_wrap', {
      opacity: 1,
      y: 0,
      duration: 0.1,
    })
    .to('#section2 .tit_wrap > *', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    })
    // mood_selector 컨테이너 애니메이션
    .to('#section2 .mood_selector', {
      opacity: 1,
      y: 0,
      duration: 0.5,
    }, '-=0.3')
    // mood_result 컨테이너 애니메이션
    .to('#section2 .mood_result', {
      opacity: 1,
      y: 0,
      duration: 0.5,
    }, '-=0.2');
  },
  
  // Section 3 - How It Works
  f_3: function() {
    const tl = gsap.timeline();
    tl.to('#section3 .tit_wrap', {
      opacity: 1,
      y: 0,
      duration: 0.1,
    })
    .to('#section3 .tit_wrap > *', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    })
    .to('#section3 .step_item', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    }, '-=0.3');
  },
  
  // Section 4 - Community
  f_4: function() {
    const tl = gsap.timeline();
    tl.to('#section4 .tit_wrap', {
      opacity: 1,
      y: 0,
      duration: 0.1,
    })
    .to('#section4 .tit_wrap > *', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    })
    .to('#section4 .bubble', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
    }, '-=0.3')
    .to('#section4 .review_card', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.2');
  },
  
  // Section 5 - Stats
  f_5: function() {
    const tl = gsap.timeline();
    tl.to('#section5 .tit_wrap', {
      opacity: 1,
      y: 0,
      duration: 0.1,
    })
    .to('#section5 .tit_wrap > *', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
    })
    .to('#section5 .stat_item', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
    }, '-=0.3');
    
    // Number Counter Animation
    countUp();
  },
};

// ========================================
// Number Counter Animation
// ========================================
function countUp() {
  $('.count').each(function() {
    let $this = $(this);
    if ($this.data('counted')) return;
    
    let countTo = $this.attr('data-count');
    
    $({ countNum: 0 }).animate({
      countNum: countTo
    }, {
      duration: 2000,
      easing: 'swing',
      step: function() {
        $this.text(Math.floor(this.countNum).toLocaleString());
      },
      complete: function() {
        $this.text(parseInt(this.countNum).toLocaleString());
        $this.data('counted', true);
      }
    });
  });
}

// ========================================
// Scroll Animation Trigger
// ========================================
let section = document.querySelectorAll('section');
let triggered = {};

// Section 0 애니메이션 즉시 실행
window.addEventListener('load', function() {
  setTimeout(function() {
    funcObj['f_0']();
    triggered['f_0'] = true;
  }, 300);
});

window.addEventListener('scroll', function() {
  let scroll = document.scrollingElement.scrollTop;
  let viewHeight = window.innerHeight;
  
  section.forEach((sec, i) => {
    let funcName = 'f_' + i;
    
    // 이미 실행된 애니메이션은 스킵
    if (triggered[funcName]) return;
    
    let secTop = sec.offsetTop;
    let secHeight = sec.offsetHeight;
    
    // 섹션이 뷰포트에 진입했을 때 실행
    if (scroll > secTop - viewHeight + 100 && scroll < secTop + secHeight) {
      if (funcObj[funcName]) {
        funcObj[funcName]();
        triggered[funcName] = true;
      }
    }
  });
});


// ========================================
// jQuery Functions
// ========================================
$(function() {
  
  const BODY = $('body');
  const mobBtn = $('.mob_btn');
  const scrollTopBtn = $('.scrollTop_btn');
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  mobBtn.on('click', function(e) {
    e.preventDefault();
    BODY.toggleClass('mOpen');
  });
  
  // Close menu when clicking overlay
  $(document).on('click', function(e) {
    if (BODY.hasClass('mOpen')) {
      if (!$(e.target).closest('.subNav, .mob_btn').length) {
        BODY.removeClass('mOpen');
      }
    }
  });
  
  // ========================================
  // Tablet PC Nav - 서브메뉴 클릭으로 열기
  // (768px ~ 1199px에서 부모 링크 비활성화, 서브메뉴만 토글)
  // ========================================
  const hasSubItems = $('.h_nav > li.has_sub');
  const hasSubLinks = $('.h_nav > li.has_sub > a');
  
  hasSubLinks.on('click', function(e) {
    let w = $(window).innerWidth();
    
    // 태블릿 가로 모드에서 항상 링크 이동 방지
    if (w >= 768 && w <= 1199) {
      e.preventDefault();
      e.stopPropagation();
      
      let $parent = $(this).parent();
      
      // 다른 서브메뉴 닫기
      hasSubItems.not($parent).removeClass('active');
      
      // 현재 서브메뉴 토글
      $parent.toggleClass('active');
    }
  });
  
  // 서브메뉴 내부 링크 클릭 시 이벤트 전파 중지
  $('.h_nav .sub_menu a').on('click', function(e) {
    e.stopPropagation();
    // 링크 클릭 후 서브메뉴 닫기
    hasSubItems.removeClass('active');
  });
  
  // 외부 클릭 시 서브메뉴 닫기
  $(document).on('click touchstart', function(e) {
    if (!$(e.target).closest('.h_nav').length) {
      hasSubItems.removeClass('active');
    }
  });
  
  // ========================================
  // Mobile Submenu Accordion
  // ========================================
  const mobSubBtn = $('.sub_menu_mob > li');
  
  mobSubBtn.on('click', function() {
    $(this).siblings().find('.depth2').slideUp(300);
    $(this).siblings().removeClass('active');
    
    $(this).find('.depth2').slideToggle(200);
    $(this).toggleClass('active');
  });
  
  // ========================================
  // Scroll - Header & Scroll Top Button
  // ========================================
  $(window).on('scroll', function() {
    let scroll = $(this).scrollTop();
    
    if (scroll > 60) {
      BODY.addClass('scrolling');
      scrollTopBtn.addClass('On');
    } else {
      BODY.removeClass('scrolling');
      scrollTopBtn.removeClass('On');
    }
  });
  
  // ========================================
  // Scroll Top Button Click
  // ========================================
  scrollTopBtn.on('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ========================================
  // Scroll Indicator Click
  // ========================================
  $('.scroll_indicator').on('click', function() {
    let target = $('#section1');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800);
    }
  });
  
  // ========================================
  // Mood Matching Functionality
  // ========================================
  const moodData = {
    solo: { emoji: '😌', name: '조용히 혼밥' },
    work: { emoji: '💻', name: '카공하고파' },
    kids: { emoji: '👶🏻', name: '아이랑 외식' },
    pet: { emoji: '🐶', name: '댕댕이랑' },
    date: { emoji: '💕', name: '분위기 있게' },
    group: { emoji: '🗓️', name: '친구들 모임' }
  };
  
  $(document).on('click', '.mood_btn', function() {
    let mood = $(this).data('mood');
    let data = moodData[mood];
    
    // 버튼 활성화 상태 변경
    $('.mood_btn').removeClass('active');
    $(this).addClass('active');
    
    // 결과 타이틀 업데이트
    $('.result_emoji').text(data.emoji);
    $('.mood_name').text(data.name);
    
    // 패널 전환 (show_all 클래스 초기화)
    $('.result_panel').removeClass('active');
    $('.result_cards').removeClass('show_all');
    $('.result_panel[data-panel="' + mood + '"]').addClass('active');
    
    // 더보기 버튼 텍스트 초기화
    $('.more_btn').text('더 많은 추천 보기');
    
    // 카드 애니메이션
    gsap.fromTo('.result_panel.active .result_card', 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.4)' }
    );
  });
  
  // ========================================
  // Result Cards - 더보기 버튼
  // ========================================
  $(document).on('click', '.more_btn', function() {
    let $activePanel = $('.result_panel.active .result_cards');
    let $btn = $(this);
    
    if ($activePanel.hasClass('show_all')) {
      // 접기
      $activePanel.removeClass('show_all');
      $btn.text('더 많은 추천 보기');
      
      // 섹션 상단으로 스크롤
      $('html, body').animate({
        scrollTop: $('#section2').offset().top - 80
      }, 500);
    } else {
      // 펼치기
      $activePanel.addClass('show_all');
      $btn.text('접기');
      
      // 새로 나타난 카드 애니메이션
      gsap.fromTo('.result_panel.active .result_card:nth-child(n+4)', 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }
  });
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  $('a[href^="#"]').on('click', function(e) {
    let href = $(this).attr('href');
    if (href === '#') return;
    
    let w = $(window).innerWidth();
    let $this = $(this);
    
    // 태블릿에서 has_sub > a는 무시 (위에서 별도 처리)
    if (w >= 768 && w <= 1199) {
      if ($this.parent().hasClass('has_sub')) {
        return;
      }
    }
    
    let target = $(href);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800);
      
      // Close mobile menu if open
      BODY.removeClass('mOpen');
      
      // 태블릿에서 서브메뉴 닫기
      hasSubItems.removeClass('active');
    }
  });
  
  // ========================================
  // Window Resize Handler
  // ========================================
  $(window).on('resize', function() {
    let w = $(window).innerWidth();
    
    // PC 모드 (1200px 이상)
    if (w > 1199) {
      BODY.removeClass('mOpen');
      $('.subNav').removeAttr('style');
      $('.sub_menu_mob .depth2').removeAttr('style');
      $('.sub_menu_mob > li').removeClass('active');
      // 태블릿 서브메뉴 active 제거
      $('.h_nav > li.has_sub').removeClass('active');
    }
    
    // 태블릿 세로/모바일 (767px 이하)
    if (w <= 767) {
      // 태블릿 서브메뉴 active 제거
      $('.h_nav > li.has_sub').removeClass('active');
    }
  });
  
});
