+function($){"use strict";function clearMenus(e){e&&3===e.which||($(backdrop).remove(),$(toggle).each(function(){var $this=$(this),$parent=getParent($this),relatedTarget={relatedTarget:this};$parent.hasClass("open")&&($parent.trigger(e=$.Event("hide.bs.dropdown",relatedTarget)),e.isDefaultPrevented()||($this.attr("aria-expanded","false"),$parent.removeClass("open").trigger("hidden.bs.dropdown",relatedTarget)))}))}function getParent($this){var selector=$this.attr("data-target");selector||(selector=$this.attr("href"),selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,""));var $parent=selector&&$(selector);return $parent&&$parent.length?$parent:$this.parent()}function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.dropdown");data||$this.data("bs.dropdown",data=new Dropdown(this)),"string"==typeof option&&data[option].call($this)})}var backdrop=".dropdown-backdrop",toggle='[data-toggle="dropdown"]',Dropdown=function(element){$(element).on("click.bs.dropdown",this.toggle)};Dropdown.VERSION="3.3.1",Dropdown.prototype.toggle=function(e){var $this=$(this);if(!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(clearMenus(),!isActive){"ontouchstart"in document.documentElement&&!$parent.closest(".navbar-nav").length&&$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click",clearMenus);var relatedTarget={relatedTarget:this};if($parent.trigger(e=$.Event("show.bs.dropdown",relatedTarget)),e.isDefaultPrevented())return;$this.trigger("focus").attr("aria-expanded","true"),$parent.toggleClass("open").trigger("shown.bs.dropdown",relatedTarget)}return!1}},Dropdown.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var $this=$(this);if(e.preventDefault(),e.stopPropagation(),!$this.is(".disabled, :disabled")){var $parent=getParent($this),isActive=$parent.hasClass("open");if(!isActive&&27!=e.which||isActive&&27==e.which)return 27==e.which&&$parent.find(toggle).trigger("focus"),$this.trigger("click");var desc=" li:not(.divider):visible a",$items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc);if($items.length){var index=$items.index(e.target);38==e.which&&index>0&&index--,40==e.which&&index<$items.length-1&&index++,~index||(index=0),$items.eq(index).trigger("focus")}}}};var old=$.fn.dropdown;$.fn.dropdown=Plugin,$.fn.dropdown.Constructor=Dropdown,$.fn.dropdown.noConflict=function(){return $.fn.dropdown=old,this},$(document).on("click.bs.dropdown.data-api",clearMenus).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api",toggle,Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',Dropdown.prototype.keydown)}(jQuery),+function($){"use strict";function getTargetFromTrigger($trigger){var href,target=$trigger.attr("data-target")||(href=$trigger.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,"");return $(target)}function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data("bs.collapse"),options=$.extend({},Collapse.DEFAULTS,$this.data(),"object"==typeof option&&option);!data&&options.toggle&&"show"==option&&(options.toggle=!1),data||$this.data("bs.collapse",data=new Collapse(this,options)),"string"==typeof option&&data[option]()})}var Collapse=function(element,options){this.$element=$(element),this.options=$.extend({},Collapse.DEFAULTS,options),this.$trigger=$(this.options.trigger).filter('[href="#'+element.id+'"], [data-target="#'+element.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};Collapse.VERSION="3.3.1",Collapse.TRANSITION_DURATION=350,Collapse.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass("width");return hasWidth?"width":"height"},Collapse.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var activesData,actives=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(actives&&actives.length&&(activesData=actives.data("bs.collapse"),activesData&&activesData.transitioning))){var startEvent=$.Event("show.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){actives&&actives.length&&(Plugin.call(actives,"hide"),activesData||actives.data("bs.collapse",null));var dimension=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var complete=function(){this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!$.support.transition)return complete.call(this);var scrollSize=$.camelCase(["scroll",dimension].join("-"));this.$element.one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}}}},Collapse.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var startEvent=$.Event("hide.bs.collapse");if(this.$element.trigger(startEvent),!startEvent.isDefaultPrevented()){var dimension=this.dimension();this.$element[dimension](this.$element[dimension]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var complete=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return $.support.transition?void this.$element[dimension](0).one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION):complete.call(this)}}},Collapse.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element);this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()},Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass("in");$element.attr("aria-expanded",isOpen),$trigger.toggleClass("collapsed",!isOpen).attr("aria-expanded",isOpen)};var old=$.fn.collapse;$.fn.collapse=Plugin,$.fn.collapse.Constructor=Collapse,$.fn.collapse.noConflict=function(){return $.fn.collapse=old,this},$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var $this=$(this);$this.attr("data-target")||e.preventDefault();var $target=getTargetFromTrigger($this),data=$target.data("bs.collapse"),option=data?"toggle":$.extend({},$this.data(),{trigger:this});Plugin.call($target,option)})}(jQuery);