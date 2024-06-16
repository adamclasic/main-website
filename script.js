var debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
};
function copyToClipboard(selector) {
  var $temp = jQuery("<div>");
  jQuery("body").append($temp);
  $temp
    .attr("contenteditable", !0)
    .html(jQuery(selector).data("url"))
    .select()
    .on("focus", function () {
      document.execCommand("selectAll", !1, null);
    })
    .focus();
  document.execCommand("copy");
  $temp.remove();
  jQuery(selector)
    .find(".bdt-social-share-title")
    .html(jQuery(selector).data("copied"));
  setTimeout(() => {
    jQuery(selector)
      .find(".bdt-social-share-title")
      .html(jQuery(selector).data("orginal"));
  }, 5000);
}
jQuery(".bdt-ss-link").on("click", function () {
  copyToClipboard(this);
});
(function ($, elementor) {
  "use strict";
  var widgetAccordion = function ($scope, $) {
    var $accrContainer = $scope.find(".bdt-ep-accordion-container"),
      $accordion = $accrContainer.find(".bdt-ep-accordion");
    if (!$accrContainer.length) {
      return;
    }
    var $settings = $accordion.data("settings");
    var activeHash = $settings.activeHash;
    var hashTopOffset = $settings.hashTopOffset;
    var hashScrollspyTime = $settings.hashScrollspyTime;
    var activeScrollspy = $settings.activeScrollspy;
    if (activeScrollspy === null || typeof activeScrollspy === "undefined") {
      activeScrollspy = "no";
    }
    function hashHandler($accordion, hashScrollspyTime, hashTopOffset) {
      if (window.location.hash) {
        if (
          $($accordion).find(
            '[data-title="' + window.location.hash.substring(1) + '"]'
          ).length
        ) {
          var hashTarget = $(
            '[data-title="' + window.location.hash.substring(1) + '"]'
          )
            .closest($accordion)
            .attr("id");
          if (activeScrollspy == "yes") {
            $("html, body")
              .animate(
                {
                  easing: "slow",
                  scrollTop: $("#" + hashTarget).offset().top - hashTopOffset,
                },
                hashScrollspyTime,
                function () {}
              )
              .promise()
              .then(function () {
                bdtUIkit
                  .accordion($accordion)
                  .toggle(
                    $(
                      '[data-title="' + window.location.hash.substring(1) + '"]'
                    ).data("accordion-index"),
                    !1
                  );
              });
          } else {
            bdtUIkit
              .accordion($accordion)
              .toggle(
                $(
                  '[data-title="' + window.location.hash.substring(1) + '"]'
                ).data("accordion-index"),
                !0
              );
          }
        }
      }
    }
    if (activeHash == "yes") {
      $(window).on("load", function () {
        if (activeScrollspy == "yes") {
          hashHandler($accordion, hashScrollspyTime, hashTopOffset);
        } else {
          bdtUIkit
            .accordion($accordion)
            .toggle(
              $(
                '[data-title="' + window.location.hash.substring(1) + '"]'
              ).data("accordion-index"),
              !1
            );
        }
      });
      $($accordion)
        .find(".bdt-ep-accordion-title")
        .off("click")
        .on("click", function (event) {
          window.location.hash = $.trim($(this).attr("data-title"));
          hashHandler($accordion, (hashScrollspyTime = 1000), hashTopOffset);
        });
      $(window).on("hashchange", function (e) {
        hashHandler($accordion, (hashScrollspyTime = 1000), hashTopOffset);
      });
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-accordion.default",
      widgetAccordion
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetCookieConsent = function ($scope, $) {
    var $cookieConsent = $scope.find(".bdt-cookie-consent"),
      $settings = $cookieConsent.data("settings"),
      editMode = Boolean(elementorFrontend.isEditMode());
    if (!$cookieConsent.length || editMode) {
      return;
    }
    window.cookieconsent.initialise($settings);
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-cookie-consent.default",
      widgetCookieConsent
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetCountdown = function ($scope, $) {
    var $countdown = $scope.find(".bdt-countdown-wrapper");
    if (!$countdown.length) {
      return;
    }
    var $settings = $countdown.data("settings"),
      endTime = $settings.endTime,
      loopHours = $settings.loopHours,
      isLogged = $settings.isLogged;
    var countDownObj = {
      setCookie: function (name, value, hours) {
        var expires = "";
        if (hours) {
          var date = new Date();
          date.setTime(date.getTime() + hours * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      },
      getCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
      randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      getTimeSpan: function (date) {
        var total = date - Date.now();
        return {
          total,
          seconds: (total / 1000) % 60,
          minutes: (total / 1000 / 60) % 60,
          hours: (total / 1000 / 60 / 60) % 24,
          days: total / 1000 / 60 / 60 / 24,
        };
      },
      showPost: function (endTime) {
        jQuery.ajax({
          url: $settings.adminAjaxUrl,
          type: "post",
          data: {
            action: "element_pack_countdown_end",
            endTime: endTime,
            couponTrickyId: $settings.couponTrickyId,
          },
          success: function (data) {
            if (data == "ended") {
              if ($settings.endActionType == "message") {
                jQuery($settings.msgId).css({
                  display: "block",
                });
                jQuery($settings.id + "-timer").css({
                  display: "none",
                });
              }
              if ($settings.endActionType == "url") {
                setInterval(function () {
                  jQuery(location).attr("href", $settings.redirectUrl);
                }, $settings.redirectDelay);
              }
            }
          },
          error: function () {
            console.log("Error");
          },
        });
      },
      couponCode: function () {
        jQuery.ajax({
          url: $settings.adminAjaxUrl,
          type: "post",
          data: {
            action: "element_pack_countdown_end",
            endTime: endTime,
            couponTrickyId: $settings.couponTrickyId,
          },
          success: function (data) {},
          error: function () {},
        });
      },
      triggerFire: function () {
        jQuery.ajax({
          url: $settings.adminAjaxUrl,
          type: "post",
          data: {
            action: "element_pack_countdown_end",
            endTime: endTime,
            couponTrickyId: $settings.couponTrickyId,
          },
          success: function (data) {
            if (data == "ended") {
              setTimeout(function () {
                document.getElementById($settings.triggerId).click();
              }, 1500);
            }
          },
          error: function () {},
        });
      },
      clearInterVal: function (myInterVal) {
        clearInterval(myInterVal);
      },
    };
    if (loopHours == !1) {
      var countdown = bdtUIkit.countdown($($settings.id + "-timer"), {
        date: $settings.finalTime,
      });
      var myInterVal = setInterval(function () {
        var seconds = countDownObj
          .getTimeSpan(countdown.date)
          .seconds.toFixed(0);
        var finalSeconds = parseInt(seconds);
        if (finalSeconds < 0) {
          if (!jQuery("body").hasClass("elementor-editor-active")) {
            jQuery($settings.id + "-msg").css({
              display: "none",
            });
            if ($settings.endActionType != "none") {
              countDownObj.showPost(endTime);
            }
          }
          countDownObj.clearInterVal(myInterVal);
        }
      }, 1000);
      if ($settings.endActionType == "coupon-code") {
        var myInterVal2 = setInterval(function () {
          var seconds = countDownObj
            .getTimeSpan(countdown.date)
            .seconds.toFixed(0);
          var finalSeconds = parseInt(seconds);
          if (finalSeconds < 0) {
            if (!jQuery("body").hasClass("elementor-editor-active")) {
              if ($settings.endActionType == "coupon-code") {
                countDownObj.couponCode(endTime);
              }
            }
            countDownObj.clearInterVal(myInterVal2);
          }
        }, 1000);
      }
      if ($settings.triggerId !== !1) {
        var myInterVal2 = setInterval(function () {
          var seconds = countDownObj
            .getTimeSpan(countdown.date)
            .seconds.toFixed(0);
          var finalSeconds = parseInt(seconds);
          if (finalSeconds < 0) {
            if (!jQuery("body").hasClass("elementor-editor-active")) {
              countDownObj.triggerFire();
            }
            countDownObj.clearInterVal(myInterVal2);
          }
        }, 1000);
      }
    }
    if (loopHours !== !1) {
      var now = new Date(),
        randMinute = countDownObj.randomIntFromInterval(6, 14),
        hours = loopHours * 60 * 60 * 1000 - randMinute * 60 * 1000,
        timer = new Date(now.getTime() + hours),
        loopTime = timer.toISOString(),
        getCookieLoopTime = countDownObj.getCookie("bdtCountdownLoopTime");
      if (
        (getCookieLoopTime == null || getCookieLoopTime == "undefined") &&
        isLogged === !1
      ) {
        countDownObj.setCookie("bdtCountdownLoopTime", loopTime, loopHours);
      }
      var setLoopTimer;
      if (isLogged === !1) {
        setLoopTimer = countDownObj.getCookie("bdtCountdownLoopTime");
      } else {
        setLoopTimer = loopTime;
      }
      $($settings.id + "-timer").attr(
        "data-bdt-countdown",
        "date: " + setLoopTimer
      );
      var countdown = bdtUIkit.countdown($($settings.id + "-timer"), {
        date: setLoopTimer,
      });
      var countdownDate = countdown.date;
      setInterval(function () {
        var seconds = countDownObj
          .getTimeSpan(countdownDate)
          .seconds.toFixed(0);
        var finalSeconds = parseInt(seconds);
        if (finalSeconds > 0) {
          if (
            (getCookieLoopTime == null || getCookieLoopTime == "undefined") &&
            isLogged === !1
          ) {
            countDownObj.setCookie("bdtCountdownLoopTime", loopTime, loopHours);
            bdtUIkit.countdown($($settings.id + "-timer"), {
              date: setLoopTimer,
            });
          }
        }
      }, 1000);
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-countdown.default",
      widgetCountdown
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-countdown.bdt-tiny-countdown",
      widgetCountdown
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetSimpleContactForm = function ($scope, $) {
    var $contactForm = $scope.find(".bdt-contact-form .without-recaptcha");
    if (!$contactForm.length) {
      return;
    }
    $contactForm.submit(function (e) {
      sendContactForm($contactForm);
      return !1;
    });
    return !1;
  };
  function sendContactForm($contactForm) {
    var langStr = window.ElementPackConfig.contact_form;
    $.ajax({
      url: $contactForm.attr("action"),
      type: "POST",
      data: $contactForm.serialize(),
      beforeSend: function () {
        bdtUIkit.notification({
          message: "<div bdt-spinner></div> " + langStr.sending_msg,
          timeout: !1,
          status: "primary",
        });
      },
      success: function (data) {
        var redirectURL = $(data).data("redirect"),
          isExternal = $(data).data("external"),
          resetStatus = $(data).data("resetstatus");
        bdtUIkit.notification.closeAll();
        var notification = bdtUIkit.notification({
          message: data,
        });
        if (redirectURL) {
          if (redirectURL != "no") {
            bdtUIkit.util.on(document, "close", function (evt) {
              if (evt.detail[0] === notification) {
                window.open(redirectURL, isExternal);
              }
            });
          }
        }
        localStorage.setItem("bdtCouponCode", $contactForm.attr("id"));
        if (resetStatus) {
          if (resetStatus !== "no") {
            $contactForm[0].reset();
          }
        }
      },
    });
    return !1;
  }
  function elementPackGIC() {
    var langStr = window.ElementPackConfig.contact_form;
    return new Promise(function (resolve, reject) {
      if (grecaptcha === undefined) {
        bdtUIkit.notification({
          message: "<div bdt-spinner></div> " + langStr.captcha_nd,
          timeout: !1,
          status: "warning",
        });
        reject();
      }
      var response = grecaptcha.getResponse();
      if (!response) {
        bdtUIkit.notification({
          message: "<div bdt-spinner></div> " + langStr.captcha_nr,
          timeout: !1,
          status: "warning",
        });
        reject();
      }
      var $contactForm = $("textarea.g-recaptcha-response")
        .filter(function () {
          return $(this).val() === response;
        })
        .closest("form.bdt-contact-form-form");
      var contactFormAction = $contactForm.attr("action");
      if (contactFormAction && contactFormAction !== "") {
        sendContactForm($contactForm);
      } else {
      }
      grecaptcha.reset();
    });
  }
  window.elementPackGICCB = elementPackGIC;
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-contact-form.default",
      widgetSimpleContactForm
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetCustomGallery = function ($scope, $) {
    var $customGallery = $scope.find(".bdt-custom-gallery"),
      $settings = $customGallery.data("settings");
    if (!$customGallery.length) {
      return;
    }
    if ($settings.tiltShow == !0) {
      var elements = document.querySelectorAll($settings.id + " [data-tilt]");
      VanillaTilt.init(elements);
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-custom-gallery.default",
      widgetCustomGallery
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-custom-gallery.bdt-abetis",
      widgetCustomGallery
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-custom-gallery.bdt-fedara",
      widgetCustomGallery
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetFlipBox = function ($scope, $) {
    var $flipBox = $scope.find(".bdt-flip-box"),
      $settings = $flipBox.data("settings");
    if (!$flipBox.length) {
      return;
    }
    if ("click" === $settings.flipTrigger) {
      $($flipBox).on("click", function () {
        $(this).toggleClass("bdt-active");
      });
    }
    if ("hover" === $settings.flipTrigger) {
      $($flipBox).on("mouseenter", function () {
        console.log("hover");
        $(this).addClass("bdt-active");
      });
      $($flipBox).on("mouseleave", function () {
        $(this).removeClass("bdt-active");
      });
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-flip-box.default",
      widgetFlipBox
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetImageCompare = function ($scope, $) {
    var $image_compare_main = $scope.find(".bdt-image-compare");
    var $image_compare = $scope.find(".image-compare");
    if (!$image_compare.length) {
      return;
    }
    var $settings = $image_compare.data("settings");
    var default_offset_pct = $settings.default_offset_pct,
      orientation = $settings.orientation,
      before_label = $settings.before_label,
      after_label = $settings.after_label,
      no_overlay = $settings.no_overlay,
      on_hover = $settings.on_hover,
      add_circle_blur = $settings.add_circle_blur,
      add_circle_shadow = $settings.add_circle_shadow,
      add_circle = $settings.add_circle,
      smoothing = $settings.smoothing,
      smoothing_amount = $settings.smoothing_amount,
      bar_color = $settings.bar_color,
      move_slider_on_hover = $settings.move_slider_on_hover;
    var viewers = document.querySelectorAll("#" + $settings.id);
    var options = {
      controlColor: bar_color,
      controlShadow: add_circle_shadow,
      addCircle: add_circle,
      addCircleBlur: add_circle_blur,
      showLabels: no_overlay,
      labelOptions: {
        before: before_label,
        after: after_label,
        onHover: on_hover,
      },
      smoothing: smoothing,
      smoothingAmount: smoothing_amount,
      hoverStart: move_slider_on_hover,
      verticalMode: orientation,
      startingPoint: default_offset_pct,
      fluidMode: !1,
    };
    viewers.forEach(function (element) {
      var view = new ImageCompare(element, options).mount();
    });
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-image-compare.default",
      widgetImageCompare
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetImageMagnifier = function ($scope, $) {
    var $imageMagnifier = $scope.find(".bdt-image-magnifier"),
      settings = $imageMagnifier.data("settings"),
      magnifier = $imageMagnifier.find("> .bdt-image-magnifier-image");
    if (!$imageMagnifier.length) {
      return;
    }
    $(magnifier).ImageZoom(settings);
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-image-magnifier.default",
      widgetImageMagnifier
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetOpenStreetMap = function ($scope, $) {
    var $openStreetMap = $scope.find(".bdt-open-street-map"),
      settings = $openStreetMap.data("settings"),
      markers = $openStreetMap.data("map_markers"),
      tileSource = "";
    if (!$openStreetMap.length) {
      return;
    }
    var avdOSMap = L.map($openStreetMap[0], {
      zoomControl: settings.zoomControl,
      scrollWheelZoom: !1,
    }).setView([settings.lat, settings.lng], settings.zoom);
    if (settings.mapboxToken !== "") {
      tileSource =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        settings.mapboxToken;
      L.tileLayer(tileSource, {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(avdOSMap);
    } else {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(avdOSMap);
    }
    for (var i in markers) {
      if (
        markers[i].iconUrl != "" &&
        typeof markers[i].iconUrl !== "undefined"
      ) {
        var LeafIcon = L.Icon.extend({
          options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [2, -41],
          },
        });
        var greenIcon = new LeafIcon({
          iconUrl: markers[i].iconUrl,
        });
        L.marker([markers[i].lat, markers[i].lng], {
          icon: greenIcon,
        })
          .bindPopup(markers[i].infoWindow)
          .addTo(avdOSMap);
      } else {
        if (markers[i].lat != "" && typeof markers[i].lat !== "undefined") {
          L.marker([markers[i].lat, markers[i].lng])
            .bindPopup(markers[i].infoWindow)
            .addTo(avdOSMap);
        }
      }
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-open-street-map.default",
      widgetOpenStreetMap
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetPanelSlider = function ($scope, $) {
    var $slider = $scope.find(".bdt-panel-slider");
    if (!$slider.length) {
      return;
    }
    var $sliderContainer = $slider.find(".swiper-container"),
      $settings = $slider.data("settings"),
      $widgetSettings = $slider.data("widget-settings");
    const Swiper = elementorFrontend.utils.swiper;
    initSwiper();
    async function initSwiper() {
      var swiper = await new Swiper($sliderContainer, $settings);
      if ($settings.pauseOnHover) {
        $($sliderContainer).hover(
          function () {
            this.swiper.autoplay.stop();
          },
          function () {
            this.swiper.autoplay.start();
          }
        );
      }
    }
    if ($widgetSettings.mouseInteractivity == !0) {
      var data = $($widgetSettings.id).find(".bdt-panel-slide-item");
      $(data).each((index, element) => {
        var scene = $(element).get(0);
        var parallaxInstance = new Parallax(scene, {
          selector: ".bdt-panel-slide-thumb",
          hoverOnly: !0,
          pointerEvents: !0,
        });
      });
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-panel-slider.default",
      widgetPanelSlider
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-panel-slider.bdt-middle",
      widgetPanelSlider
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-panel-slider.always-visible",
      widgetPanelSlider
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetProgressPie = function ($scope, $) {
    var $progressPie = $scope.find(".bdt-progress-pie");
    if (!$progressPie.length) {
      return;
    }
    elementorFrontend.waypoint(
      $progressPie,
      function () {
        var $this = $(this);
        $this.asPieProgress({
          namespace: "pieProgress",
          classes: {
            svg: "bdt-progress-pie-svg",
            number: "bdt-progress-pie-number",
            content: "bdt-progress-pie-content",
          },
        });
        $this.asPieProgress("start");
      },
      {
        offset: "bottom-in-view",
      }
    );
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-progress-pie.default",
      widgetProgressPie
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetSlider = function ($scope, $) {
    var $slider = $scope.find(".bdt-slider");
    if (!$slider.length) {
      return;
    }
    var $sliderContainer = $slider.find(".swiper-container"),
      $settings = $slider.data("settings");
    const Swiper = elementorFrontend.utils.swiper;
    initSwiper();
    async function initSwiper() {
      var swiper = await new Swiper($sliderContainer, $settings);
      if ($settings.pauseOnHover) {
        $($sliderContainer).hover(
          function () {
            this.swiper.autoplay.stop();
          },
          function () {
            this.swiper.autoplay.start();
          }
        );
      }
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-slider.default",
      widgetSlider
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var serachTimer;
  var widgetAjaxSearch = function ($scope, $) {
    var $searchContainer = $scope.find(".bdt-search-container"),
      $searchWidget = $scope.find(".bdt-ajax-search");
    let $search;
    if (!$searchWidget.length) {
      return;
    }
    var $resultHolder = $($searchWidget).find(".bdt-search-result"),
      $settings = $($searchWidget).data("settings"),
      $connectSettings = $($searchContainer).data("settings"),
      $target = $($searchWidget).attr("anchor-target");
    if ("yes" === $target) {
      $target = "_blank";
    } else {
      $target = "_self";
    }
    clearTimeout(serachTimer);
    if ($connectSettings && $connectSettings.element_connect) {
      $($connectSettings.element_selector).hide();
    }
    $($searchWidget).on("keyup keypress", function (e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return !1;
      }
    });
    $searchWidget.find(".bdt-search-input").keyup(function () {
      $search = $(this).val();
      serachTimer = setTimeout(function () {
        $($searchWidget).addClass("bdt-search-loading");
        jQuery.ajax({
          url: window.ElementPackConfig.ajaxurl,
          type: "post",
          data: {
            action: "element_pack_search",
            s: $search,
            settings: $settings,
          },
          success: function (response) {
            var response = $.parseJSON(response);
            if (response.results.length > 0) {
              if ($search.length >= 3) {
                var output = `<div class="bdt-search-result-inner">
                        <h3 class="bdt-search-result-header">SEARCH RESULT<i class="eicon-editor-close bdt-search-result-close-btn"></i></h3>
                        <ul class="bdt-list bdt-list-divider">`;
                for (let i = 0; i < response.results.length; i++) {
                  const element = response.results[i];
                  output += `<li class="bdt-search-item" data-url="${element.url}">
                          <a href="${element.url}" target="${$target}">
                          <div class="bdt-search-title">${element.title}</div>
                          <div class="bdt-search-text">${element.text}</div>
                          </a>
                        </li>`;
                }
                output += `</ul><a class="bdt-search-more">${window.ElementPackConfig.search.more_result}</a></div>`;
                $resultHolder.html(output);
                $resultHolder.show();
                $(".bdt-search-result-close-btn").on("click", function (e) {
                  $(".bdt-search-result").hide();
                  $(".bdt-search-input").val("");
                });
                $($searchWidget).removeClass("bdt-search-loading");
                $(".bdt-search-more").on("click", function (event) {
                  event.preventDefault();
                  $($searchWidget).submit();
                });
              } else {
                $resultHolder.hide();
              }
            } else {
              if ($search.length > 3) {
                var not_found = `<div class="bdt-search-result-inner">
                                <h3 class="bdt-search-result-header">${window.ElementPackConfig.search.search_result}<i class="eicon-editor-close bdt-search-result-close-btn"></i></h3>
                                <div class="bdt-search-text">${$search} ${window.ElementPackConfig.search.not_found}</div>
                              </div>`;
                $resultHolder.html(not_found);
                $resultHolder.show();
                $(".bdt-search-result-close-btn").on("click", function (e) {
                  $(".bdt-search-result").hide();
                  $(".bdt-search-input").val("");
                });
                $($searchWidget).removeClass("bdt-search-loading");
                if ($connectSettings && $connectSettings.element_connect) {
                  $resultHolder.hide();
                  setTimeout(function () {
                    $($connectSettings.element_selector).show();
                  }, 1500);
                }
              } else {
                $resultHolder.hide();
                $($searchWidget).removeClass("bdt-search-loading");
              }
            }
          },
        });
      }, 450);
    });
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-search.default",
      widgetAjaxSearch
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetScrollButton = function ($scope, $) {
    var $scrollButton = $scope.find(".bdt-scroll-button"),
      $selector = $scrollButton.data("selector"),
      $settings = $scrollButton.data("settings");
    if (!$scrollButton.length) {
      return;
    }
    if ($settings.HideOnBeforeScrolling == !0) {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          $scrollButton.css("opacity", "1");
        } else {
          $scrollButton.css("opacity", "0");
        }
      });
    }
    $($scrollButton).on("click", function (event) {
      event.preventDefault();
      bdtUIkit.scroll($scrollButton, $settings).scrollTo($($selector));
    });
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-scroll-button.default",
      widgetScrollButton
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetStaticCarousel = function ($scope, $) {
    var $StaticCarousel = $scope.find(".bdt-static-carousel");
    if (!$StaticCarousel.length) {
      return;
    }
    var $StaticCarouselContainer = $StaticCarousel.find(".swiper-container"),
      $settings = $StaticCarousel.data("settings");
    const Swiper = elementorFrontend.utils.swiper;
    initSwiper();
    async function initSwiper() {
      var swiper = await new Swiper($StaticCarouselContainer, $settings);
      if ($settings.pauseOnHover) {
        $($StaticCarouselContainer).hover(
          function () {
            this.swiper.autoplay.stop();
          },
          function () {
            this.swiper.autoplay.start();
          }
        );
      }
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-static-carousel.default",
      widgetStaticCarousel
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetToggle = function ($scope, $) {
    var $toggleContainer = $scope.find(".bdt-show-hide-container");
    var $toggle = $toggleContainer.find(".bdt-show-hide");
    if (!$toggleContainer.length) {
      return;
    }
    var $settings = $toggle.data("settings");
    var toggleId = $settings.id;
    var animTime = $settings.scrollspy_time;
    var scrollspy_top_offset = $settings.scrollspy_top_offset;
    var by_widget_selector_status = $settings.by_widget_selector_status;
    var toggle_initially_open = $settings.toggle_initially_open;
    var source_selector = $settings.source_selector;
    var widget_visibility = $settings.widget_visibility;
    var widget_visibility_tablet = $settings.widget_visibility_tablet;
    var widget_visibility_mobile = $settings.widget_visibility_mobile;
    var viewport_lg = $settings.viewport_lg;
    var viewport_md = $settings.viewport_md;
    var widget_visibility_filtered = widget_visibility;
    if (
      $settings.widget_visibility == "undefined" ||
      $settings.widget_visibility == null
    ) {
      widget_visibility_filtered = widget_visibility = 0;
    }
    if (
      $settings.widget_visibility_tablet == "undefined" ||
      $settings.widget_visibility_tablet == null
    ) {
      widget_visibility_tablet = widget_visibility;
    }
    if (
      $settings.widget_visibility_mobile == "undefined" ||
      $settings.widget_visibility_mobile == null
    ) {
      widget_visibility_mobile = widget_visibility;
    }
    function widgetVsibleFiltered() {
      if (window.outerWidth > viewport_lg) {
        widget_visibility_filtered = widget_visibility;
      } else if (window.outerWidth > viewport_md) {
        widget_visibility_filtered = widget_visibility_tablet;
      } else {
        widget_visibility_filtered = widget_visibility_mobile;
      }
    }
    $(window).resize(function () {
      widgetVsibleFiltered();
    });
    function scrollspyHandler(
      $toggle,
      toggleId,
      toggleBtn,
      animTime,
      scrollspy_top_offset
    ) {
      if (
        $settings.status_scrollspy === "yes" &&
        by_widget_selector_status !== "yes"
      ) {
        if ($($toggle).find(".bdt-show-hide-item")) {
          if ($settings.hash_location === "yes") {
            window.location.hash = $.trim(toggleId);
          }
          var scrollspyWrapper = $("#bdt-show-hide-" + toggleId).find(
            ".bdt-show-hide-item"
          );
          $("html, body")
            .animate(
              {
                easing: "slow",
                scrollTop:
                  $(scrollspyWrapper).offset().top - scrollspy_top_offset,
              },
              animTime,
              function () {}
            )
            .promise()
            .then(function () {
              $(toggleBtn)
                .siblings(".bdt-show-hide-content")
                .slideToggle("slow", function () {
                  $(toggleBtn).parent().toggleClass("bdt-open");
                });
            });
        }
      } else {
        if (by_widget_selector_status === "yes") {
          $(toggleBtn).parent().toggleClass("bdt-open");
          $(toggleBtn)
            .siblings(".bdt-show-hide-content")
            .slideToggle("slow", function () {});
        } else {
          $(toggleBtn)
            .siblings(".bdt-show-hide-content")
            .slideToggle("slow", function () {
              $(toggleBtn).parent().toggleClass("bdt-open");
            });
        }
      }
    }
    $($toggle)
      .find(".bdt-show-hide-title")
      .off("click")
      .on("click", function (event) {
        var toggleBtn = $(this);
        scrollspyHandler(
          $toggle,
          toggleId,
          toggleBtn,
          animTime,
          scrollspy_top_offset
        );
      });
    function hashHandler() {
      toggleId = window.location.hash.substring(1);
      var toggleBtn = $("#bdt-show-hide-" + toggleId).find(
        ".bdt-show-hide-title"
      );
      var scrollspyWrapper = $("#bdt-show-hide-" + toggleId).find(
        ".bdt-show-hide-item"
      );
      $("html, body")
        .animate(
          {
            easing: "slow",
            scrollTop: $(scrollspyWrapper).offset().top - scrollspy_top_offset,
          },
          animTime,
          function () {}
        )
        .promise()
        .then(function () {
          $(toggleBtn)
            .siblings(".bdt-show-hide-content")
            .slideToggle("slow", function () {
              $(toggleBtn).parent().toggleClass("bdt-open");
            });
        });
    }
    $(window).on("load", function () {
      if (
        $($toggleContainer).find(
          "#bdt-show-hide-" + window.location.hash.substring(1)
        ).length != 0
      ) {
        if ($settings.hash_location === "yes") {
          hashHandler();
        }
      }
    });
    function autoHeightAnimate(element, time) {
      var curHeight = element.height(),
        autoHeight = element.css("height", "auto").height();
      element.height(curHeight);
      element.stop().animate(
        {
          height: autoHeight,
        },
        time
      );
    }
    function byWidgetHandler() {
      if ($settings.status_scrollspy === "yes") {
        $("html, body")
          .animate(
            {
              easing: "slow",
              scrollTop: $(source_selector).offset().top - scrollspy_top_offset,
            },
            animTime,
            function () {}
          )
          .promise()
          .then(function () {
            if ($(source_selector).hasClass("bdt-fold-close")) {
              $(source_selector)
                .removeClass("bdt-fold-close toggle_initially_open")
                .addClass("bdt-fold-open");
              autoHeightAnimate($(source_selector), 500);
            } else {
              $(source_selector)
                .css({
                  height: widget_visibility_filtered + "px",
                })
                .addClass("bdt-fold-close")
                .removeClass("bdt-fold-open");
            }
          });
      } else {
        if ($(source_selector).hasClass("bdt-fold-close")) {
          $(source_selector)
            .removeClass("bdt-fold-close toggle_initially_open")
            .addClass("bdt-fold-open");
          autoHeightAnimate($(source_selector), 500);
        } else {
          $(source_selector)
            .css({
              height: widget_visibility_filtered + "px",
              transition: "all 1s ease-in-out 0s",
            })
            .addClass("bdt-fold-close")
            .removeClass("bdt-fold-open");
        }
      }
    }
    if (by_widget_selector_status === "yes") {
      $($toggle)
        .find(".bdt-show-hide-title")
        .on("click", function () {
          byWidgetHandler();
        });
      if (toggle_initially_open === "yes") {
        $(source_selector).addClass(
          "bdt-fold-toggle bdt-fold-open toggle_initially_open"
        );
      } else {
        $(source_selector).addClass(
          "bdt-fold-toggle bdt-fold-close toggle_initially_open"
        );
      }
      $(window).resize(function () {
        visibilityCalled();
      });
      visibilityCalled();
    }
    function visibilityCalled() {
      if ($(source_selector).hasClass("bdt-fold-close")) {
        $(source_selector).css({
          height: widget_visibility_filtered + "px",
        });
      } else {
        autoHeightAnimate($(source_selector), 500);
      }
    }
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-toggle.default",
      widgetToggle
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  var widgetUserRegistrationForm = {
    registraitonFormSubmit: function (_this, $scope) {
      bdtUIkit.notification({
        message:
          "<div bdt-spinner></div>" +
          $(_this).find(".bdt_spinner_message").val(),
        timeout: !1,
      });
      $(_this).find("button.bdt-button").attr("disabled", !0);
      var redirect_url = $(_this).find(".redirect_after_register").val();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: element_pack_ajax_login_config.ajaxurl,
        data: {
          action: "element_pack_ajax_register",
          first_name: $(_this).find(".first_name").val(),
          last_name: $(_this).find(".last_name").val(),
          email: $(_this).find(".user_email").val(),
          password: $(_this).find(".user_password").val(),
          is_password_required: $(_this).find(".is_password_required").val(),
          "g-recaptcha-response": $(_this).find("#g-recaptcha-response").val(),
          widget_id: $scope.data("id"),
          page_id: $(_this).find(".page_id").val(),
          security: $(_this).find("#bdt-user-register-sc").val(),
          lang: element_pack_ajax_login_config.language,
        },
        success: function (data) {
          var recaptcha_field = _this.find(".element-pack-google-recaptcha");
          if (recaptcha_field.length > 0) {
            var recaptcha_id = recaptcha_field.attr("data-widgetid");
            grecaptcha.reset(recaptcha_id);
            grecaptcha.execute(recaptcha_id);
          }
          if (data.registered === !0) {
            bdtUIkit.notification.closeAll();
            bdtUIkit.notification({
              message:
                "<div class=\"bdt-flex\"><span bdt-icon='icon: info'></span><span>" +
                data.message +
                "</span></div>",
              status: "primary",
            });
            if (redirect_url) {
              document.location.href = redirect_url;
            }
          } else {
            bdtUIkit.notification.closeAll();
            bdtUIkit.notification({
              message:
                "<div class=\"bdt-flex\"><span bdt-icon='icon: warning'></span><span>" +
                data.message +
                "</span></div>",
              status: "warning",
            });
          }
          $(_this).find("button.bdt-button").attr("disabled", !1);
        },
      });
    },
    load_recaptcha: function () {
      var reCaptchaFields = $(".element-pack-google-recaptcha"),
        widgetID;
      if (reCaptchaFields.length > 0) {
        reCaptchaFields.each(function () {
          var self = $(this),
            attrWidget = self.attr("data-widgetid");
          if (typeof attrWidget !== typeof undefined && attrWidget !== !1) {
            return;
          } else {
            widgetID = grecaptcha.render($(this).attr("id"), {
              sitekey: self.data("sitekey"),
              callback: function (response) {
                if (response !== "") {
                  self.append(
                    jQuery("<input>", {
                      type: "hidden",
                      value: response,
                      class: "g-recaptcha-response",
                    })
                  );
                }
              },
            });
            self.attr("data-widgetid", widgetID);
          }
        });
      }
    },
  };
  window.onLoadElementPackRegisterCaptcha =
    widgetUserRegistrationForm.load_recaptcha;
  var widgetUserRegisterForm = function ($scope, $) {
    var register_form = $scope.find(".bdt-user-register-widget"),
      recaptcha_field = $scope.find(".element-pack-google-recaptcha"),
      $userRegister = $scope.find(".bdt-user-register");
    register_form.on("submit", function (e) {
      e.preventDefault();
      widgetUserRegistrationForm.registraitonFormSubmit(register_form, $scope);
    });
    if (
      elementorFrontend.isEditMode() &&
      undefined === recaptcha_field.attr("data-widgetid")
    ) {
      onLoadElementPackRegisterCaptcha();
    }
    if (recaptcha_field.length > 0) {
      grecaptcha.ready(function () {
        var recaptcha_id = recaptcha_field.attr("data-widgetid");
        grecaptcha.execute(recaptcha_id);
      });
    }
    var $settings = $userRegister.data("settings");
    if (!$settings || typeof $settings.passStrength === "undefined") {
      return;
    }
    console.log($settings);
    var percentage = 0,
      $selector = $("#" + $settings.id),
      $progressBar = $("#" + $settings.id).find(".bdt-progress-bar");
    var passStrength = {
      progress: function ($value = 0) {
        if ($value <= 100) {
          $($progressBar).css({
            width: $value + "%",
          });
        }
      },
      formula: function (input, length) {
        if (length < 6) {
          percentage = 0;
          $($progressBar).css("background", "#ff4d4d");
        } else if (length < 8) {
          percentage = 10;
          $($progressBar).css("background", "#ffff1a");
        } else if (
          input.match(/0|1|2|3|4|5|6|7|8|9/) == null &&
          input.match(/[A-Z]/) == null
        ) {
          percentage = 40;
          $($progressBar).css("background", "#ffc14d");
        } else {
          if (length < 12) {
            percentage = 50;
            $($progressBar).css("background", "#1aff1a");
          } else {
            percentage = 60;
            $($progressBar).css("background", "#1aff1a");
          }
        }
        if (input.match(/[a-z]/) != null) {
          percentage += 10;
        }
        if (input.match(/[A-Z]/) != null) {
          percentage += 10;
        }
        if (input.match(/0|1|2|3|4|5|6|7|8|9/) != null) {
          percentage += 10;
        }
        if (input.match(/\W/) != null && input.match(/\D/) != null) {
          percentage += 10;
        }
        return percentage;
      },
      forceStrongPass: function (result) {
        if (result >= 70) {
          $($selector)
            .find(".elementor-field-type-submit .bdt-button")
            .prop("disabled", !1);
        } else {
          $($selector)
            .find(".elementor-field-type-submit .bdt-button")
            .prop("disabled", !0);
        }
      },
      init: function () {
        $scope.find(".user_password").keyup(function () {
          var input = $(this).val(),
            length = input.length;
          let result = passStrength.formula(input, length);
          console.log(result);
          passStrength.progress(result);
          if (typeof $settings.forceStrongPass !== "undefined") {
            passStrength.forceStrongPass(result);
          }
        });
        if (typeof $settings.forceStrongPass !== "undefined") {
          $($selector)
            .find(".elementor-field-type-submit .bdt-button")
            .prop("disabled", !0);
        }
      },
    };
    passStrength.init();
  };
  jQuery(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-user-register.default",
      widgetUserRegisterForm
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-user-register.bdt-dropdown",
      widgetUserRegisterForm
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/bdt-user-register.bdt-modal",
      widgetUserRegisterForm
    );
  });
})(jQuery, window.elementorFrontend);
(function ($, elementor) {
  "use strict";
  $(window).on("elementor/frontend/init", function () {
    var ModuleHandler = elementorModules.frontend.handlers.Base,
      FloatingEffect;
    FloatingEffect = ModuleHandler.extend({
      bindEvents: function () {
        this.run();
      },
      getDefaultSettings: function () {
        return {
          direction: "alternate",
          easing: "easeInOutSine",
          loop: !0,
        };
      },
      settings: function (key) {
        return this.getElementSettings("ep_floating_effects_" + key);
      },
      onElementChange: debounce(function (prop) {
        if (prop.indexOf("ep_floating") !== -1) {
          this.anime && this.anime.restart();
          this.run();
        }
      }, 400),
      run: function () {
        var options = this.getDefaultSettings(),
          element = this.findElement(".elementor-widget-container").get(0);
        if (this.settings("translate_toggle")) {
          if (
            this.settings("translate_x.sizes.from").length !== 0 ||
            this.settings("translate_x.sizes.to").length !== 0
          ) {
            options.translateX = {
              value: [
                this.settings("translate_x.sizes.from") || 0,
                this.settings("translate_x.sizes.to") || 0,
              ],
              duration: this.settings("translate_duration.size"),
              delay: this.settings("translate_delay.size") || 0,
            };
          }
          if (
            this.settings("translate_y.sizes.from").length !== 0 ||
            this.settings("translate_y.sizes.to").length !== 0
          ) {
            options.translateY = {
              value: [
                this.settings("translate_y.sizes.from") || 0,
                this.settings("translate_y.sizes.to") || 0,
              ],
              duration: this.settings("translate_duration.size"),
              delay: this.settings("translate_delay.size") || 0,
            };
          }
        }
        if (this.settings("rotate_toggle")) {
          if (this.settings("rotate_infinite") !== "yes") {
            if (
              this.settings("rotate_x.sizes.from").length !== 0 ||
              this.settings("rotate_x.sizes.to").length !== 0
            ) {
              options.rotateX = {
                value: [
                  this.settings("rotate_x.sizes.from") || 0,
                  this.settings("rotate_x.sizes.to") || 0,
                ],
                duration: this.settings("rotate_duration.size"),
                delay: this.settings("rotate_delay.size") || 0,
              };
            }
            if (
              this.settings("rotate_y.sizes.from").length !== 0 ||
              this.settings("rotate_y.sizes.to").length !== 0
            ) {
              options.rotateY = {
                value: [
                  this.settings("rotate_y.sizes.from") || 0,
                  this.settings("rotate_y.sizes.to") || 0,
                ],
                duration: this.settings("rotate_duration.size"),
                delay: this.settings("rotate_delay.size") || 0,
              };
            }
            if (
              this.settings("rotate_z.sizes.from").length !== 0 ||
              this.settings("rotate_z.sizes.to").length !== 0
            ) {
              options.rotateZ = {
                value: [
                  this.settings("rotate_z.sizes.from") || 0,
                  this.settings("rotate_z.sizes.to") || 0,
                ],
                duration: this.settings("rotate_duration.size"),
                delay: this.settings("rotate_delay.size") || 0,
              };
            }
          }
        }
        if (this.settings("scale_toggle")) {
          if (
            this.settings("scale_x.sizes.from").length !== 0 ||
            this.settings("scale_x.sizes.to").length !== 0
          ) {
            options.scaleX = {
              value: [
                this.settings("scale_x.sizes.from") || 0,
                this.settings("scale_x.sizes.to") || 0,
              ],
              duration: this.settings("scale_duration.size"),
              delay: this.settings("scale_delay.size") || 0,
            };
          }
          if (
            this.settings("scale_y.sizes.from").length !== 0 ||
            this.settings("scale_y.sizes.to").length !== 0
          ) {
            options.scaleY = {
              value: [
                this.settings("scale_y.sizes.from") || 0,
                this.settings("scale_y.sizes.to") || 0,
              ],
              duration: this.settings("scale_duration.size"),
              delay: this.settings("scale_delay.size") || 0,
            };
          }
        }
        if (this.settings("skew_toggle")) {
          if (
            this.settings("skew_x.sizes.from").length !== 0 ||
            this.settings("skew_x.sizes.to").length !== 0
          ) {
            options.skewX = {
              value: [
                this.settings("skew_x.sizes.from") || 0,
                this.settings("skew_x.sizes.to") || 0,
              ],
              duration: this.settings("skew_duration.size"),
              delay: this.settings("skew_delay.size") || 0,
            };
          }
          if (
            this.settings("skew_y.sizes.from").length !== 0 ||
            this.settings("skew_y.sizes.to").length !== 0
          ) {
            options.skewY = {
              value: [
                this.settings("skew_y.sizes.from") || 0,
                this.settings("skew_y.sizes.to") || 0,
              ],
              duration: this.settings("skew_duration.size"),
              delay: this.settings("skew_delay.size") || 0,
            };
          }
        }
        if (this.settings("border_radius_toggle")) {
          jQuery(element).css("overflow", "hidden");
          if (
            this.settings("border_radius.sizes.from").length !== 0 ||
            this.settings("border_radius.sizes.to").length !== 0
          ) {
            options.borderRadius = {
              value: [
                this.settings("border_radius.sizes.from") || 0,
                this.settings("border_radius.sizes.to") || 0,
              ],
              duration: this.settings("border_radius_duration.size"),
              delay: this.settings("border_radius_delay.size") || 0,
            };
          }
        }
        if (this.settings("opacity_toggle")) {
          if (
            this.settings("opacity_start.size").length !== 0 ||
            this.settings("opacity_end.size").length !== 0
          ) {
            options.opacity = {
              value: [
                this.settings("opacity_start.size") || 1,
                this.settings("opacity_end.size") || 0,
              ],
              duration: this.settings("opacity_duration.size"),
              easing: "linear",
            };
          }
        }
        if (this.settings("easing")) {
          options.easing = this.settings("easing");
        }
        if (this.settings("show")) {
          options.targets = element;
          if (
            this.settings("translate_toggle") ||
            this.settings("rotate_toggle") ||
            this.settings("scale_toggle") ||
            this.settings("skew_toggle") ||
            this.settings("border_radius_toggle") ||
            this.settings("opacity_toggle")
          ) {
            this.anime = window.anime && window.anime(options);
          }
        }
      },
    });
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/widget",
      function ($scope) {
        elementorFrontend.elementsHandler.addHandler(FloatingEffect, {
          $element: $scope,
        });
      }
    );
  });
})(jQuery, window.elementorFrontend);
