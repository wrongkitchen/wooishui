/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));


//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map

//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));


//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return Bb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){vb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return o(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){sc[a]||(e(b),sc[a]=!0)}function h(a,b){return function(c){return r(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function k(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function l(){}function m(a,b){b!==!1&&H(a),p(this,a),this._d=new Date(+a._d),uc===!1&&(uc=!0,vb.updateOffset(this),uc=!1)}function n(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=vb.localeData(),this._bubble()}function o(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function p(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Kb.length>0)for(c in Kb)d=Kb[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function s(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function t(a,b){var c;return b=M(b,a),a.isBefore(b)?c=s(a,b):(c=s(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function u(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=vb.duration(c,d),v(this,e,a),this}}function v(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&pb(a,"Date",ob(a,"Date")+f*c),g&&nb(a,ob(a,"Month")+g*c),d&&vb.updateOffset(a,f||g)}function w(a){return"[object Array]"===Object.prototype.toString.call(a)}function x(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function y(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&C(a[d])!==C(b[d]))&&g++;return g+f}function z(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=lc[a]||mc[b]||b}return a}function A(a){var b,d,e={};for(d in a)c(a,d)&&(b=z(d),b&&(e[b]=a[d]));return e}function B(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}vb[b]=function(e,f){var g,h,i=vb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=vb().utc().set(d,a);return i.call(vb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function C(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function D(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function E(a,b,c){return jb(vb([a,11,31+b-c]),b,c).week}function F(a){return G(a)?366:365}function G(a){return a%4===0&&a%100!==0||a%400===0}function H(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Db]<0||a._a[Db]>11?Db:a._a[Eb]<1||a._a[Eb]>D(a._a[Cb],a._a[Db])?Eb:a._a[Fb]<0||a._a[Fb]>24||24===a._a[Fb]&&(0!==a._a[Gb]||0!==a._a[Hb]||0!==a._a[Ib])?Fb:a._a[Gb]<0||a._a[Gb]>59?Gb:a._a[Hb]<0||a._a[Hb]>59?Hb:a._a[Ib]<0||a._a[Ib]>999?Ib:-1,a._pf._overflowDayOfYear&&(Cb>b||b>Eb)&&(b=Eb),a._pf.overflow=b)}function I(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function J(a){return a?a.toLowerCase().replace("_","-"):a}function K(a){for(var b,c,d,e,f=0;f<a.length;){for(e=J(a[f]).split("-"),b=e.length,c=J(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=L(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&y(e,c,!0)>=b-1)break;b--}f++}return null}function L(a){var b=null;if(!Jb[a]&&Lb)try{b=vb.locale(),require("./locale/"+a),vb.locale(b)}catch(c){}return Jb[a]}function M(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(vb.isMoment(a)||x(a)?+a:+vb(a))-+c,c._d.setTime(+c._d+d),vb.updateOffset(c,!1),c):vb(a).local()}function N(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function O(a){var b,c,d=a.match(Pb);for(b=0,c=d.length;c>b;b++)d[b]=rc[d[b]]?rc[d[b]]:N(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function P(a,b){return a.isValid()?(b=Q(b,a.localeData()),nc[b]||(nc[b]=O(b)),nc[b](a)):a.localeData().invalidDate()}function Q(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Qb.lastIndex=0;d>=0&&Qb.test(a);)a=a.replace(Qb,c),Qb.lastIndex=0,d-=1;return a}function R(a,b){var c,d=b._strict;switch(a){case"Q":return _b;case"DDDD":return bc;case"YYYY":case"GGGG":case"gggg":return d?cc:Tb;case"Y":case"G":case"g":return ec;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?dc:Ub;case"S":if(d)return _b;case"SS":if(d)return ac;case"SSS":if(d)return bc;case"DDD":return Sb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Wb;case"a":case"A":return b._locale._meridiemParse;case"x":return Zb;case"X":return $b;case"Z":case"ZZ":return Xb;case"T":return Yb;case"SSSS":return Vb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?ac:Rb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Rb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp($(Z(a.replace("\\","")),"i"))}}function S(a){a=a||"";var b=a.match(Xb)||[],c=b[b.length-1]||[],d=(c+"").match(jc)||["-",0,0],e=+(60*d[1])+C(d[2]);return"+"===d[0]?e:-e}function T(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Db]=3*(C(b)-1));break;case"M":case"MM":null!=b&&(e[Db]=C(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Db]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Eb]=C(b));break;case"Do":null!=b&&(e[Eb]=C(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=C(b));break;case"YY":e[Cb]=vb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Cb]=C(b);break;case"a":case"A":c._meridiem=b;break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Fb]=C(b);break;case"m":case"mm":e[Gb]=C(b);break;case"s":case"ss":e[Hb]=C(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Ib]=C(1e3*("0."+b));break;case"x":c._d=new Date(C(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=S(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=C(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=vb.parseTwoDigitYear(b)}}function U(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Cb],jb(vb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Cb],jb(vb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=kb(d,e,f,h,g),a._a[Cb]=i.year,a._dayOfYear=i.dayOfYear}function V(a){var c,d,e,f,g=[];if(!a._d){for(e=X(a),a._w&&null==a._a[Eb]&&null==a._a[Db]&&U(a),a._dayOfYear&&(f=b(a._a[Cb],e[Cb]),a._dayOfYear>F(f)&&(a._pf._overflowDayOfYear=!0),d=fb(f,0,a._dayOfYear),a._a[Db]=d.getUTCMonth(),a._a[Eb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Fb]&&0===a._a[Gb]&&0===a._a[Hb]&&0===a._a[Ib]&&(a._nextDay=!0,a._a[Fb]=0),a._d=(a._useUTC?fb:eb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Fb]=24)}}function W(a){var b;a._d||(b=A(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],V(a))}function X(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function Y(b){if(b._f===vb.ISO_8601)return void ab(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Q(b._f,b._locale).match(Pb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(R(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),rc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),T(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Fb]<=12&&(b._pf.bigHour=a),b._a[Fb]=k(b._locale,b._a[Fb],b._meridiem),V(b),H(b)}function Z(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function $(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function _(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=p({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],Y(b),I(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));o(a,c||b)}function ab(a){var b,c,d=a._i,e=fc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=hc.length;c>b;b++)if(hc[b][1].exec(d)){a._f=hc[b][0]+(e[6]||" ");break}for(b=0,c=ic.length;c>b;b++)if(ic[b][1].exec(d)){a._f+=ic[b][0];break}d.match(Xb)&&(a._f+="Z"),Y(a)}else a._isValid=!1}function bb(a){ab(a),a._isValid===!1&&(delete a._isValid,vb.createFromInputFallback(a))}function cb(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function db(b){var c,d=b._i;d===a?b._d=new Date:x(d)?b._d=new Date(+d):null!==(c=Mb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?bb(b):w(d)?(b._a=cb(d.slice(0),function(a){return parseInt(a,10)}),V(b)):"object"==typeof d?W(b):"number"==typeof d?b._d=new Date(d):vb.createFromInputFallback(b)}function eb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fb(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function gb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function hb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function ib(a,b,c){var d=vb.duration(a).abs(),e=Ab(d.as("s")),f=Ab(d.as("m")),g=Ab(d.as("h")),h=Ab(d.as("d")),i=Ab(d.as("M")),j=Ab(d.as("y")),k=e<oc.s&&["s",e]||1===f&&["m"]||f<oc.m&&["mm",f]||1===g&&["h"]||g<oc.h&&["hh",g]||1===h&&["d"]||h<oc.d&&["dd",h]||1===i&&["M"]||i<oc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,hb.apply({},k)}function jb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=vb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function kb(a,b,c,d,e){var f,g,h=fb(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:F(a-1)+g}}function lb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||vb.localeData(b._l),null===d||e===a&&""===d?vb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),vb.isMoment(d)?new m(d,!0):(e?w(e)?_(b):Y(b):db(b),c=new m(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function mb(a,b){var c,d;if(1===b.length&&w(b[0])&&(b=b[0]),!b.length)return vb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function nb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),D(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function ob(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function pb(a,b,c){return"Month"===b?nb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function qb(a,b){return function(c){return null!=c?(pb(this,a,c),vb.updateOffset(this,b),this):ob(this,a)}}function rb(a){return 400*a/146097}function sb(a){return 146097*a/400}function tb(a){vb.duration.fn[a]=function(){return this._data[a]}}function ub(a){"undefined"==typeof ender&&(wb=zb.moment,zb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",vb):vb)}for(var vb,wb,xb,yb="2.9.0",zb="undefined"==typeof global||"undefined"!=typeof window&&window!==global.window?this:global,Ab=Math.round,Bb=Object.prototype.hasOwnProperty,Cb=0,Db=1,Eb=2,Fb=3,Gb=4,Hb=5,Ib=6,Jb={},Kb=[],Lb="undefined"!=typeof module&&module&&module.exports,Mb=/^\/?Date\((\-?\d+)/i,Nb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ob=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Pb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Qb=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Rb=/\d\d?/,Sb=/\d{1,3}/,Tb=/\d{1,4}/,Ub=/[+\-]?\d{1,6}/,Vb=/\d+/,Wb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Xb=/Z|[\+\-]\d\d:?\d\d/gi,Yb=/T/i,Zb=/[\+\-]?\d+/,$b=/[\+\-]?\d+(\.\d{1,3})?/,_b=/\d/,ac=/\d\d/,bc=/\d{3}/,cc=/\d{4}/,dc=/[+-]?\d{6}/,ec=/[+-]?\d+/,fc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,gc="YYYY-MM-DDTHH:mm:ssZ",hc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],ic=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],jc=/([\+\-]|\d\d)/gi,kc=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),lc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},mc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},nc={},oc={s:45,m:45,h:22,d:26,M:11},pc="DDD w W M D d".split(" "),qc="M D H h m s w W".split(" "),rc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return r(this.year()%100,2)},YYYY:function(){return r(this.year(),4)},YYYYY:function(){return r(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+r(Math.abs(a),6)},gg:function(){return r(this.weekYear()%100,2)},gggg:function(){return r(this.weekYear(),4)},ggggg:function(){return r(this.weekYear(),5)},GG:function(){return r(this.isoWeekYear()%100,2)},GGGG:function(){return r(this.isoWeekYear(),4)},GGGGG:function(){return r(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return C(this.milliseconds()/100)},SS:function(){return r(C(this.milliseconds()/10),2)},SSS:function(){return r(this.milliseconds(),3)},SSSS:function(){return r(this.milliseconds(),3)},Z:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+":"+r(C(a)%60,2)},ZZ:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+r(C(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},sc={},tc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"],uc=!1;pc.length;)xb=pc.pop(),rc[xb+"o"]=i(rc[xb],xb);for(;qc.length;)xb=qc.pop(),rc[xb+xb]=h(rc[xb],2);rc.DDDD=h(rc.DDD,3),o(l.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=vb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=vb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return jb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},firstDayOfWeek:function(){return this._week.dow},firstDayOfYear:function(){return this._week.doy},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),vb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),lb(g)},vb.suppressDeprecationWarnings=!1,vb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),vb.min=function(){var a=[].slice.call(arguments,0);return mb("isBefore",a)},vb.max=function(){var a=[].slice.call(arguments,0);return mb("isAfter",a)},vb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),lb(g).utc()},vb.unix=function(a){return vb(1e3*a)},vb.duration=function(a,b){var d,e,f,g,h=a,i=null;return vb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Nb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:C(i[Eb])*d,h:C(i[Fb])*d,m:C(i[Gb])*d,s:C(i[Hb])*d,ms:C(i[Ib])*d}):(i=Ob.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):null==h?h={}:"object"==typeof h&&("from"in h||"to"in h)&&(g=t(vb(h.from),vb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new n(h),vb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},vb.version=yb,vb.defaultFormat=gc,vb.ISO_8601=function(){},vb.momentProperties=Kb,vb.updateOffset=function(){},vb.relativeTimeThreshold=function(b,c){return oc[b]===a?!1:c===a?oc[b]:(oc[b]=c,!0)},vb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return vb.locale(a,b)}),vb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?vb.defineLocale(a,b):vb.localeData(a),c&&(vb.duration._locale=vb._locale=c)),vb._locale._abbr},vb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Jb[a]||(Jb[a]=new l),Jb[a].set(b),vb.locale(a),Jb[a]):(delete Jb[a],null)},vb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return vb.localeData(a)}),vb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return vb._locale;if(!w(a)){if(b=L(a))return b;a=[a]}return K(a)},vb.isMoment=function(a){return a instanceof m||null!=a&&c(a,"_isAMomentObject")},vb.isDuration=function(a){return a instanceof n};for(xb=tc.length-1;xb>=0;--xb)B(tc[xb]);vb.normalizeUnits=function(a){return z(a)},vb.invalid=function(a){var b=vb.utc(0/0);return null!=a?o(b._pf,a):b._pf.userInvalidated=!0,b},vb.parseZone=function(){return vb.apply(null,arguments).parseZone()},vb.parseTwoDigitYear=function(a){return C(a)+(C(a)>68?1900:2e3)},vb.isDate=x,o(vb.fn=m.prototype,{clone:function(){return vb(this)},valueOf:function(){return+this._d-6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=vb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():P(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return I(this)},isDSTShifted:function(){return this._a?this.isValid()&&y(this._a,(this._isUTC?vb.utc(this._a):vb(this._a)).toArray())>0:!1},parsingFlags:function(){return o({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.utcOffset(0,a)},local:function(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(this._dateUtcOffset(),"m")),this},format:function(a){var b=P(this,a||vb.defaultFormat);return this.localeData().postformat(b)},add:u(1,"add"),subtract:u(-1,"subtract"),diff:function(a,b,c){var d,e,f=M(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=j(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:q(e)},from:function(a,b){return vb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(vb(),a)},calendar:function(a){var b=a||vb(),c=M(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,vb(b)))},isLeapYear:function(){return G(this.year())},isDST:function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=gb(a,this.localeData()),this.add(a-b,"d")):b},month:qb("Month",!0),startOf:function(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=z(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this>+a):(c=vb.isMoment(a)?+a:+vb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+a>+this):(c=vb.isMoment(a)?+a:+vb(a),+this.clone().endOf(b)<c)},isBetween:function(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)},isSame:function(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this===+a):(c=+vb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),a>this?this:a}),zone:f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",function(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}),utcOffset:function(a,b){var c,d=this._offset||0;return null!=a?("string"==typeof a&&(a=S(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateUtcOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.add(c,"m"),d!==a&&(!b||this._changeInProgress?v(this,vb.duration(a-d,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,vb.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?d:this._dateUtcOffset()},isLocal:function(){return!this._isUTC},isUtcOffset:function(){return this._isUTC},isUtc:function(){return this._isUTC&&0===this._offset},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(S(this._i)),this},hasAlignedHourOffset:function(a){return a=a?vb(a).utcOffset():0,(this.utcOffset()-a)%60===0},daysInMonth:function(){return D(this.year(),this.month())},dayOfYear:function(a){var b=Ab((vb(this).startOf("day")-vb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=jb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=jb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=jb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return E(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return E(this.year(),a.dow,a.doy)},get:function(a){return a=z(a),this[a]()},set:function(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else a=z(a),"function"==typeof this[a]&&this[a](b);return this},locale:function(b){var c;return b===a?this._locale._abbr:(c=vb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateUtcOffset:function(){return 15*-Math.round(this._d.getTimezoneOffset()/15)}}),vb.fn.millisecond=vb.fn.milliseconds=qb("Milliseconds",!1),vb.fn.second=vb.fn.seconds=qb("Seconds",!1),vb.fn.minute=vb.fn.minutes=qb("Minutes",!1),vb.fn.hour=vb.fn.hours=qb("Hours",!0),vb.fn.date=qb("Date",!0),vb.fn.dates=f("dates accessor is deprecated. Use date instead.",qb("Date",!0)),vb.fn.year=qb("FullYear",!0),vb.fn.years=f("years accessor is deprecated. Use year instead.",qb("FullYear",!0)),vb.fn.days=vb.fn.day,vb.fn.months=vb.fn.month,vb.fn.weeks=vb.fn.week,vb.fn.isoWeeks=vb.fn.isoWeek,vb.fn.quarters=vb.fn.quarter,vb.fn.toJSON=vb.fn.toISOString,vb.fn.isUTC=vb.fn.isUtc,o(vb.duration.fn=n.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=q(d/1e3),g.seconds=a%60,b=q(a/60),g.minutes=b%60,c=q(b/60),g.hours=c%24,e+=q(c/24),h=q(rb(e)),e-=q(sb(h)),f+=q(e/30),e%=30,h+=q(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return q(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*C(this._months/12)
},humanize:function(a){var b=ib(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=vb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=vb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=z(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=z(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*rb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(sb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:vb.fn.lang,locale:vb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale},toJSON:function(){return this.toISOString()}}),vb.duration.fn.toString=vb.duration.fn.toISOString;for(xb in kc)c(kc,xb)&&tb(xb.toLowerCase());vb.duration.fn.asMilliseconds=function(){return this.as("ms")},vb.duration.fn.asSeconds=function(){return this.as("s")},vb.duration.fn.asMinutes=function(){return this.as("m")},vb.duration.fn.asHours=function(){return this.as("h")},vb.duration.fn.asDays=function(){return this.as("d")},vb.duration.fn.asWeeks=function(){return this.as("weeks")},vb.duration.fn.asMonths=function(){return this.as("M")},vb.duration.fn.asYears=function(){return this.as("y")},vb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===C(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Lb?module.exports=vb:"function"==typeof define&&define.amd?(define(function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(zb.moment=wb),vb}),ub(!0)):ub()}).call(this);

/**
 * Framework7 1.0.2
 * Full Featured Mobile HTML Framework For Building iOS Apps
 * 
 * http://www.idangero.us/framework7
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 22, 2015
 */
!function(){"use strict";window.Framework7=function(a){function t(e){var a=e.replace(/^./,function(e){return e.toUpperCase()});o["onPage"+a]=function(a,t){return o.onPage(e,a,t)}}function n(){var e,a=s(this),t=a[0].scrollTop,n=a[0].scrollHeight,r=a[0].offsetHeight,o=a[0].getAttribute("data-distance"),i=a.find(".virtual-list"),l=a.hasClass("infinite-scroll-top");if(o||(o=50),"string"==typeof o&&o.indexOf("%")>=0&&(o=parseInt(o,10)/100*r),o>r&&(o=r),l)o>t&&a.trigger("infinite");else if(t+r>=n-o){if(i.length>0&&(e=i[0].f7VirtualList,e&&!e.reachEnd))return;a.trigger("infinite")}}function r(){o.device.ipad&&(document.body.scrollLeft=0,setTimeout(function(){document.body.scrollLeft=0},0))}var o=this;o.version="1.0.2",o.params={cache:!0,cacheIgnore:[],cacheIgnoreGetParameters:!1,cacheDuration:6e5,preloadPreviousPage:!0,uniqueHistory:!1,uniqueHistoryIgnoreGetParameters:!1,dynamicPageUrl:"content-{{index}}",allowDuplicateUrls:!1,router:!0,pushState:!1,pushStateRoot:void 0,pushStateNoAnimation:!1,pushStateSeparator:"#!/",fastClicks:!0,fastClicksDistanceThreshold:0,fastClicksDelayBetweenClicks:50,activeState:!0,activeStateElements:"a, button, label, span",animateNavBackIcon:!1,swipeBackPage:!0,swipeBackPageThreshold:0,swipeBackPageActiveArea:30,swipeBackPageAnimateShadow:!0,swipeBackPageAnimateOpacity:!0,ajaxLinks:void 0,externalLinks:".external",sortable:!0,hideNavbarOnPageScroll:!1,hideToolbarOnPageScroll:!1,hideTabbarOnPageScroll:!1,showBarsOnPageScrollEnd:!0,swipeout:!0,swipeoutActionsNoFold:!1,swipeoutNoFollow:!1,smartSelectBackTemplate:'<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>',smartSelectBackText:"Back",smartSelectInPopup:!1,smartSelectPopupCloseTemplate:'<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>',smartSelectPopupCloseText:"Close",smartSelectSearchbar:!1,smartSelectBackOnSelect:!1,searchbarHideDividers:!0,searchbarHideGroups:!0,scrollTopOnNavbarClick:!1,scrollTopOnStatusbarClick:!1,swipePanel:!1,swipePanelActiveArea:0,swipePanelCloseOpposite:!0,swipePanelOnlyClose:!1,swipePanelNoFollow:!1,swipePanelThreshold:0,panelsCloseByOutside:!0,modalButtonOk:"OK",modalButtonCancel:"Cancel",modalUsernamePlaceholder:"Username",modalPasswordPlaceholder:"Password",modalTitle:"Framework7",modalCloseByOutside:!1,actionsCloseByOutside:!0,popupCloseByOutside:!0,modalPreloaderTitle:"Loading... ",modalStack:!0,imagesLazyLoadThreshold:0,imagesLazyLoadSequential:!0,viewClass:"view",viewMainClass:"view-main",viewsClass:"views",notificationCloseOnClick:!1,notificationCloseIcon:!0,animatePages:!0,templates:{},template7Data:{},template7Pages:!1,precompileTemplates:!1,init:!0};for(var i in a)o.params[i]=a[i];var s=e,l=Template7;o._compiledTemplates={},o.touchEvents={start:o.support.touch?"touchstart":"mousedown",move:o.support.touch?"touchmove":"mousemove",end:o.support.touch?"touchend":"mouseup"},o.ls=window.localStorage,o.rtl="rtl"===s("body").css("direction"),o.rtl&&s("html").attr("dir","rtl"),"undefined"!=typeof o.params.statusbarOverlay&&(o.params.statusbarOverlay?s("html").addClass("with-statusbar-overlay"):s("html").removeClass("with-statusbar-overlay")),o.views=[];var p=function(e,a){var t,n={dynamicNavbar:!1,domCache:!1,linksView:void 0,reloadPages:!1,uniqueHistory:o.params.uniqueHistory,uniqueHistoryIgnoreGetParameters:o.params.uniqueHistoryIgnoreGetParameters,allowDuplicateUrls:o.params.allowDuplicateUrls,swipeBackPage:o.params.swipeBackPage,swipeBackPageAnimateShadow:o.params.swipeBackPageAnimateShadow,swipeBackPageAnimateOpacity:o.params.swipeBackPageAnimateOpacity,swipeBackPageActiveArea:o.params.swipeBackPageActiveArea,swipeBackPageThreshold:o.params.swipeBackPageThreshold,animatePages:o.params.animatePages,preloadPreviousPage:o.params.preloadPreviousPage};a=a||{};for(var r in n)"undefined"==typeof a[r]&&(a[r]=n[r]);var i=this;i.params=a,i.selector=e;var l=s(e);if(i.container=l[0],i.contentCache={},i.pagesCache={},l[0].f7View=i,i.pagesContainer=l.find(".pages")[0],i.initialPages=[],i.initialNavbars=[],i.params.domCache){var p=l.find(".page");for(t=0;t<p.length;t++)i.initialPages.push(p[t]);if(i.params.dynamicNavbar){var d=l.find(".navbar-inner");for(t=0;t<d.length;t++)i.initialNavbars.push(d[t])}}i.allowPageChange=!0;var c=document.location.href;i.history=[];var f=c,u=o.params.pushStateSeparator,h=o.params.pushStateRoot;o.params.pushState&&(h?f=h:f.indexOf(u)>=0&&f.indexOf(u+"#")<0&&(f=f.split(u)[0]));var m,g;i.activePage||(m=s(i.pagesContainer).find(".page-on-center"),0===m.length&&(m=s(i.pagesContainer).find(".page:not(.cached)"),m=m.eq(m.length-1)),m.length>0&&(g=m[0].f7PageData)),i.params.domCache&&m?(i.url=l.attr("data-url")||i.params.url||"#"+m.attr("data-page"),i.pagesCache[i.url]=m.attr("data-page")):i.url=l.attr("data-url")||i.params.url||f,g&&(g.view=i,g.url=i.url,i.activePage=g,m[0].f7PageData=g),i.url&&i.history.push(i.url),i.main=l.hasClass(o.params.viewMainClass);var v,w,b,C,y,x,T,k,S,P,M,O=!1,I=!1,D={},E=[],L=[],N=!0,B=[],A=[];if(i.handleTouchStart=function(e){N&&i.params.swipeBackPage&&!O&&!o.swipeoutOpenedEl&&(I=!1,O=!0,v=void 0,D.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,D.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,C=(new Date).getTime(),S=i.params.dynamicNavbar&&l.find(".navbar-inner").length>1)},i.handleTouchMove=function(e){if(O){var a="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,t="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY;if("undefined"==typeof v&&(v=!!(v||Math.abs(t-D.y)>Math.abs(a-D.x))),v||e.f7PreventSwipeBack||o.preventSwipeBack)return void(O=!1);if(!I){var n=!1;w=l.width();var r=s(e.target),p=r.hasClass("swipeout")?r:r.parents(".swipeout");p.length>0&&(!o.rtl&&p.find(".swipeout-actions-left").length>0&&(n=!0),o.rtl&&p.find(".swipeout-actions-right").length>0&&(n=!0)),E=r.is(".page")?r:r.parents(".page"),E.hasClass("no-swipeback")&&(n=!0),L=l.find(".page-on-left:not(.cached)");var d=D.x-l.offset().left>i.params.swipeBackPageActiveArea;if(d=o.rtl?D.x<l.offset().left-l[0].scrollLeft+w-i.params.swipeBackPageActiveArea:D.x-l.offset().left>i.params.swipeBackPageActiveArea,d&&(n=!0),(0===L.length||0===E.length)&&(n=!0),n)return void(O=!1);i.params.swipeBackPageAnimateShadow&&!o.device.android&&(P=E.find(".swipeback-page-shadow"),0===P.length&&(P=s('<div class="swipeback-page-shadow"></div>'),E.append(P))),S&&(B=l.find(".navbar-on-center:not(.cached)"),A=l.find(".navbar-on-left:not(.cached)"),y=B.find(".left, .center, .right, .subnavbar, .fading"),x=A.find(".left, .center, .right, .subnavbar, .fading"),o.params.animateNavBackIcon&&(T=B.find(".left.sliding .back .icon"),k=A.find(".left.sliding .back .icon")))}e.f7PreventPanelSwipe=!0,I=!0,e.preventDefault();var c=o.rtl?-1:1;b=(a-D.x-i.params.swipeBackPageThreshold)*c,0>b&&(b=0);var f=b/w,u={percentage:f,activePage:E[0],previousPage:L[0],activeNavbar:B[0],previousNavbar:A[0]};i.params.onSwipeBackMove&&i.params.onSwipeBackMove(u),l.trigger("swipebackmove",u);var h=b*c,m=(b/5-w/5)*c;if(1===o.device.pixelRatio&&(h=Math.round(h),m=Math.round(m)),E.transform("translate3d("+h+"px,0,0)"),i.params.swipeBackPageAnimateShadow&&!o.device.android&&(P[0].style.opacity=1-1*f),L.transform("translate3d("+m+"px,0,0)"),i.params.swipeBackPageAnimateOpacity&&(L[0].style.opacity=.9+.1*f),S){var g;for(g=0;g<y.length;g++)if(M=s(y[g]),M.is(".subnavbar.sliding")||(M[0].style.opacity=1-1.3*f),M[0].className.indexOf("sliding")>=0){var C=f*M[0].f7NavbarRightOffset;1===o.device.pixelRatio&&(C=Math.round(C)),M.transform("translate3d("+C+"px,0,0)"),o.params.animateNavBackIcon&&M[0].className.indexOf("left")>=0&&T.length>0&&T.transform("translate3d("+-C+"px,0,0)")}for(g=0;g<x.length;g++)if(M=s(x[g]),M.is(".subnavbar.sliding")||(M[0].style.opacity=1.3*f-.3),M[0].className.indexOf("sliding")>=0){var N=M[0].f7NavbarLeftOffset*(1-f);1===o.device.pixelRatio&&(N=Math.round(N)),M.transform("translate3d("+N+"px,0,0)"),o.params.animateNavBackIcon&&M[0].className.indexOf("left")>=0&&k.length>0&&k.transform("translate3d("+-N+"px,0,0)")}}}},i.handleTouchEnd=function(){if(!O||!I)return O=!1,void(I=!1);if(O=!1,I=!1,0===b)return s([E[0],L[0]]).transform("").css({opacity:"",boxShadow:""}),void(S&&(y.transform("").css({opacity:""}),x.transform("").css({opacity:""}),T&&T.length>0&&T.transform(""),k&&T.length>0&&k.transform("")));var e=(new Date).getTime()-C,a=!1;if((300>e&&b>10||e>=300&&b>w/2)&&(E.removeClass("page-on-center").addClass("page-on-right"),L.removeClass("page-on-left").addClass("page-on-center"),S&&(B.removeClass("navbar-on-center").addClass("navbar-on-right"),A.removeClass("navbar-on-left").addClass("navbar-on-center")),a=!0),s([E[0],L[0]]).transform("").css({opacity:"",boxShadow:""}).addClass("page-transitioning"),S&&(y.css({opacity:""}).each(function(){var e=a?this.f7NavbarRightOffset:0,t=s(this);t.transform("translate3d("+e+"px,0,0)"),o.params.animateNavBackIcon&&t.hasClass("left")&&T.length>0&&T.addClass("page-transitioning").transform("translate3d("+-e+"px,0,0)")}).addClass("page-transitioning"),x.transform("").css({opacity:""}).each(function(){var e=a?0:this.f7NavbarLeftOffset,t=s(this);t.transform("translate3d("+e+"px,0,0)"),o.params.animateNavBackIcon&&t.hasClass("left")&&k.length>0&&k.addClass("page-transitioning").transform("translate3d("+-e+"px,0,0)")}).addClass("page-transitioning")),N=!1,i.allowPageChange=!1,a){var t=i.history[i.history.length-2];i.url=t,o.pageBackCallbacks("before",i,{pageContainer:E[0],url:t,position:"center",newPage:L,oldPage:E,swipeBack:!0}),o.pageAnimCallbacks("before",i,{pageContainer:L[0],url:t,position:"left",newPage:L,oldPage:E,swipeBack:!0})}E.transitionEnd(function(){s([E[0],L[0]]).removeClass("page-transitioning"),S&&(y.removeClass("page-transitioning").css({opacity:""}),x.removeClass("page-transitioning").css({opacity:""}),T&&T.length>0&&T.removeClass("page-transitioning"),k&&k.length>0&&k.removeClass("page-transitioning")),N=!0,i.allowPageChange=!0,a&&(o.params.pushState&&history.back(),o.pageBackCallbacks("after",i,{pageContainer:E[0],url:t,position:"center",newPage:L,oldPage:E,swipeBack:!0}),o.pageAnimCallbacks("after",i,{pageContainer:L[0],url:t,position:"left",newPage:L,oldPage:E,swipeBack:!0}),o.router.afterBack(i,E,L)),P&&P.length>0&&P.remove()})},i.attachEvents=function(e){var a=e?"off":"on";l[a](o.touchEvents.start,i.handleTouchStart),l[a](o.touchEvents.move,i.handleTouchMove),l[a](o.touchEvents.end,i.handleTouchEnd)},i.detachEvents=function(){i.attachEvents(!0)},i.params.swipeBackPage&&i.attachEvents(),o.views.push(i),i.main&&(o.mainView=i),i.router={load:function(e){return o.router.load(i,e)},back:function(e){return o.router.back(i,e)},loadPage:function(e){if(e=e||{},"string"==typeof e){var a=e;e={},a&&0===a.indexOf("#")&&i.params.domCache?e.pageName=a.split("#")[1]:e.url=a}return o.router.load(i,e)},loadContent:function(e){return o.router.load(i,{content:e})},reloadPage:function(e){return o.router.load(i,{url:e,reload:!0})},reloadContent:function(e){return o.router.load(i,{content:e,reload:!0})},reloadPreviousPage:function(e){return o.router.load(i,{url:e,reloadPrevious:!0,reload:!0})},reloadPreviousContent:function(e){return o.router.load(i,{content:e,reloadPrevious:!0,reload:!0})},refreshPage:function(){var e={url:i.url,reload:!0,ignoreCache:!0};return e.url&&0===e.url.indexOf("#")&&(i.params.domCache&&i.pagesCache[e.url]?(e.pageName=i.pagesCache[e.url],e.url=void 0,delete e.url):i.contentCache[e.url]&&(e.content=i.contentCache[e.url],e.url=void 0,delete e.url)),o.router.load(i,e)},refreshPreviousPage:function(){var e={url:i.history[i.history.length-2],reload:!0,reloadPrevious:!0,ignoreCache:!0};return e.url&&0===e.url.indexOf("#")&&i.params.domCache&&i.pagesCache[e.url]&&(e.pageName=i.pagesCache[e.url],e.url=void 0,delete e.url),o.router.load(i,e)}},i.loadPage=i.router.loadPage,i.loadContent=i.router.loadContent,i.reloadPage=i.router.reloadPage,i.reloadContent=i.router.reloadContent,i.reloadPreviousPage=i.router.reloadPreviousPage,i.reloadPreviousContent=i.router.reloadPreviousContent,i.refreshPage=i.router.refreshPage,i.refreshPreviousPage=i.router.refreshPreviousPage,i.back=i.router.back,i.hideNavbar=function(){return o.hideNavbar(l.find(".navbar"))},i.showNavbar=function(){return o.showNavbar(l.find(".navbar"))},i.hideToolbar=function(){return o.hideToolbar(l.find(".toolbar"))},i.showToolbar=function(){return o.showToolbar(l.find(".toolbar"))},o.params.pushState&&i.main){var z;h?z=c.split(o.params.pushStateRoot+u)[1]:c.indexOf(u)>=0&&c.indexOf(u+"#")<0&&(z=c.split(u)[1]);var H=o.params.pushStateNoAnimation?!1:void 0;if(z)o.router.load(i,{url:z,animatePages:H,pushState:!1});else if(c.indexOf(u+"#")>=0){var R=history.state;R.pageName&&"viewIndex"in R&&o.router.load(i,{pageName:R.pageName,pushState:!1})}}return i.destroy=function(){i.detachEvents(),i=void 0},o.pluginHook("addView",i),i};o.addView=function(e,a){return new p(e,a)},o.navbarInitCallback=function(e,a,t,n,r,i){var l={container:t,innerContainer:n},p={url:r,query:s.parseUrlQuery(r||""),container:a,name:s(a).attr("data-page"),view:e,from:i},d={navbar:l,page:p};o.pluginHook("navbarInit",l,p),s(n).trigger("navbarInit",d)},o.sizeNavbars=function(e){var a=e?s(e).find(".navbar .navbar-inner:not(.cached)"):s(".navbar .navbar-inner:not(.cached)");a.each(function(){var e=s(this);if(!e.hasClass("cached")){var a,t,n=e.find(o.rtl?".right":".left"),r=e.find(o.rtl?".left":".right"),i=e.find(".center"),l=e.find(".subnavbar"),p=0===n.length,d=0===r.length,c=p?0:n.outerWidth(!0),f=d?0:r.outerWidth(!0),u=i.outerWidth(!0),h=e[0].offsetWidth-parseInt(e.css("padding-left"),10)-parseInt(e.css("padding-right"),10),m=e.hasClass("navbar-on-left");d&&(a=h-u),p&&(a=0),p||d||(a=(h-f-u+c)/2);var g=(h-u)/2;h-c-f>u?(c>g&&(g=c),g+u>h-f&&(g=h-f-u),t=g-a):t=0;var v=o.rtl?-1:1,w=t;o.rtl&&p&&d&&i.length>0&&(w=-w),i.css({left:w+"px"}),i.hasClass("sliding")&&(i[0].f7NavbarLeftOffset=-(a+t)*v,i[0].f7NavbarRightOffset=(h-a-t-u)*v,m&&i.transform("translate3d("+i[0].f7NavbarLeftOffset+"px, 0, 0)")),!p&&n.hasClass("sliding")&&(o.rtl?(n[0].f7NavbarLeftOffset=-(h-n.outerWidth())/2*v,n[0].f7NavbarRightOffset=c*v):(n[0].f7NavbarLeftOffset=-c,n[0].f7NavbarRightOffset=(h-n.outerWidth())/2),m&&n.transform("translate3d("+n[0].f7NavbarLeftOffset+"px, 0, 0)")),!d&&r.hasClass("sliding")&&(o.rtl?(r[0].f7NavbarLeftOffset=-f*v,r[0].f7NavbarRightOffset=(h-r.outerWidth())/2*v):(r[0].f7NavbarLeftOffset=-(h-r.outerWidth())/2,r[0].f7NavbarRightOffset=f),m&&r.transform("translate3d("+r[0].f7NavbarLeftOffset+"px, 0, 0)")),l.length&&l.hasClass("sliding")&&(l[0].f7NavbarLeftOffset=o.rtl?l[0].offsetWidth:-l[0].offsetWidth,l[0].f7NavbarRightOffset=-l[0].f7NavbarLeftOffset)}})},o.hideNavbar=function(e){return s(e).addClass("navbar-hidden"),!0},o.showNavbar=function(e){var a=s(e);return a.addClass("navbar-hiding").removeClass("navbar-hidden").transitionEnd(function(){a.removeClass("navbar-hiding")}),!0},o.hideToolbar=function(e){return s(e).addClass("toolbar-hidden"),!0},o.showToolbar=function(e){var a=s(e);a.addClass("toolbar-hiding").removeClass("toolbar-hidden").transitionEnd(function(){a.removeClass("toolbar-hiding")})},o.initSearchbar=function(e){function a(){m.val("").trigger("change"),f.removeClass("searchbar-active searchbar-not-empty"),v.length>0&&v.css(T,-v[0].offsetWidth+"px"),w&&h.removeClass("searchbar-overlay-active"),o.device.ios?setTimeout(function(){m.blur(),w.trigger("disableSearch")},400):(m.blur(),w.trigger("disableSearch"))}function t(){o.device.ios?setTimeout(function(){w&&!f.hasClass("searchbar-active")&&h.addClass("searchbar-overlay-active"),f.addClass("searchbar-active"),v.length>0&&v.css(T,"0px"),w.trigger("enableSearch")},400):(w&&!f.hasClass("searchbar-active")&&h.addClass("searchbar-overlay-active"),f.addClass("searchbar-active"),v.length>0&&v.css(T,"0px"),w.trigger("enableSearch"))}function n(){m.val("").trigger("change").focus(),w.trigger("clearSearch")}function r(){setTimeout(function(){var e=m.val().trim();0===e.length?(f.removeClass("searchbar-not-empty"),w&&f.hasClass("searchbar-active")&&h.addClass("searchbar-overlay-active")):(f.addClass("searchbar-not-empty"),w&&f.hasClass("searchbar-active")&&h.removeClass("searchbar-overlay-active")),w.length>0&&(C||b)&&d(e)},0)}function i(e){e.preventDefault()}function l(e){var o=e?"off":"on";f[o]("submit",i),v[o]("click",a),h[o]("click",a),m[o]("focus",t),m[o]("change keydown keypress keyup",r),g[o]("click",n)}function p(){l(!0)}function d(e){if(e.trim()!==k){k=e.trim();var a=e.trim().toLowerCase().split(" "),t=[];if(b){if(u=w[0].f7VirtualList,""===e.trim())return u.resetFilter(),x.hide(),void y.show();if(u.params.searchAll)t=u.params.searchAll(e,u.items)||[];else if(u.params.searchByItem)for(var n=0;n<u.items.length;n++)u.params.searchByItem(e,n,u.params.items[n])&&t.push(n)}else C=f.attr("data-search-in"),w.find("li").removeClass("hidden-by-searchbar").each(function(e,n){n=s(n);var r=n.find(C);if(0!==r.length){var o;o=r.text().trim().toLowerCase();for(var i=0,l=0;l<a.length;l++)o.indexOf(a[l])>=0&&i++;i!==a.length?n.addClass("hidden-by-searchbar"):t.push(n[0])}}),o.params.searchbarHideDividers&&w.find(".item-divider, .list-group-title").each(function(){for(var e=s(this),a=e.nextAll("li"),t=!0,n=0;n<a.length;n++){var r=s(a[n]);if(r.hasClass("list-group-title")||r.hasClass("item-divider"))break;r.hasClass("hidden-by-searchbar")||(t=!1)}t?e.addClass("hidden-by-searchbar"):e.removeClass("hidden-by-searchbar")}),o.params.searchbarHideGroups&&w.find(".list-group").each(function(){var e=s(this),a=e.find("li:not(.hidden-by-searchbar)");0===a.length?e.addClass("hidden-by-searchbar"):e.removeClass("hidden-by-searchbar")});w.trigger("search",{query:e,foundItems:t}),0===t.length?(x.show(),y.hide()):(x.hide(),y.show()),b&&u.filterItems(t)}}function c(){p(),e.off("pageBeforeRemove",c)}e=s(e);var f=e.hasClass("searchbar")?e:e.find(".searchbar");if(0!==f.length){e.hasClass("page")||(e=f.parents(".page").eq(0));var u,h=e.hasClass("page")?e.find(".searchbar-overlay"):s(".searchbar-overlay"),m=f.find('input[type="search"]'),g=f.find(".searchbar-clear"),v=f.find(".searchbar-cancel"),w=s(f.attr("data-search-list")),b=w.hasClass("virtual-list"),C=f.attr("data-search-in"),y=(f.attr("data-search-by"),f.attr("data-searchbar-found"));y?y=s(y):(y=e.find(".searchbar-found"),0===y.length&&(y=s(".searchbar-found")));var x=f.attr("data-searchbar-not-found");x?x=s(x):(x=e.find(".searchbar-not-found"),0===x.length&&(x=s(".searchbar-not-found")));var T=o.rtl?"margin-left":"margin-right";v.length>0&&(v.show(),v.css(T,-v[0].offsetWidth+"px")),f[0].f7DestroySearchbar=p,l();var k;e.hasClass("page")&&e.on("pageBeforeRemove",c)}},o.destroySearchbar=function(e){e=s(e);var a=e.hasClass("searchbar")?e:e.find(".searchbar");0!==a.length&&a[0].f7DestroySearchbar&&a[0].f7DestroySearchbar()},o.initMessagebar=function(e){function a(e){e.preventDefault()}function t(){d.css({height:""});var e=d[0].offsetHeight,a=e-d[0].clientHeight,t=d[0].scrollHeight,n=parseInt(l.attr("data-keyboard-height")||0,10);if(t+a>e){var r=t+a,o=u+(r-h),i=l.attr("data-max-height")||l.parents(".view")[0].offsetHeight-88;o>i&&(o=parseInt(i,10),r=o-u+h),d.css("height",r+"px"),l.css("height",o+"px"),c.length>0&&(c.css("padding-bottom",o+n+"px"),c.scrollTop(c[0].scrollHeight-c[0].offsetHeight))}else c.length>0&&(l.css({height:""}),c.css({"padding-bottom":n?f+n+"px":""}))}function n(){clearTimeout(p),p=setTimeout(function(){t()},0)}function r(e){var t=e?"off":"on";l[t]("submit",a),d[t]("change keydown keypress keyup paste cut",n)}function o(){r(!0)}function i(){o(),e.off("pageBeforeRemove",i)}e=s(e);var l=e.hasClass("messagebar")?e:e.find(".messagebar");if(0!==l.length){var p,d=l.find("textarea"),c=l.parents(".page").find(".page-content"),f=parseInt(c.css("padding-bottom")),u=l[0].offsetHeight,h=d[0].offsetHeight;l[0].f7DestroyMessagebar=o,r(),e.hasClass("page")&&e.on("pageBeforeRemove",i)}},o.destroyMessagebar=function(e){e=s(e);var a=e.hasClass("messagebar")?e:e.find(".messagebar");0!==a.length&&a[0].f7DestroyMessagebar&&a[0].f7DestroyMessagebar()},o.cache=[],o.removeFromCache=function(e){for(var a=!1,t=0;t<o.cache.length;t++)o.cache[t].url===e&&(a=t);a!==!1&&o.cache.splice(a,1)},o.xhr=!1,o.get=function(e,a,t,n){var r=e;if(o.params.cacheIgnoreGetParameters&&e.indexOf("?")>=0&&(r=e.split("?")[0]),o.params.cache&&!t&&e.indexOf("nocache")<0&&o.params.cacheIgnore.indexOf(r)<0)for(var i=0;i<o.cache.length;i++)if(o.cache[i].url===r&&(new Date).getTime()-o.cache[i].time<o.params.cacheDuration)return n(o.cache[i].content),!1;return o.xhr=s.ajax({url:e,method:"GET",beforeSend:o.params.onAjaxStart,complete:function(e){200===e.status||0===e.status?(o.params.cache&&!t&&(o.removeFromCache(r),o.cache.push({url:r,time:(new Date).getTime(),content:e.responseText})),n(e.responseText,!1)):n(e.responseText,!0),o.params.onAjaxComplete&&o.params.onAjaxComplete(e)},error:function(e){n(e.responseText,!0),o.params.onAjaxError&&o.params.onAjaxError(e)}}),a&&(a.xhr=o.xhr),o.xhr},o.pageCallbacks={},o.onPage=function(e,a,t){if(a&&a.split(" ").length>1){for(var n=a.split(" "),r=[],i=0;i<n.length;i++)r.push(o.onPage(e,n[i],t));return r.remove=function(){for(var e=0;e<r.length;e++)r[e].remove()},r.trigger=function(){for(var e=0;e<r.length;e++)r[e].trigger()},r}var s=o.pageCallbacks[e][a];return s||(s=o.pageCallbacks[e][a]=[]),o.pageCallbacks[e][a].push(t),{remove:function(){for(var e,a=0;a<s.length;a++)s[a].toString()===t.toString()&&(e=a);"undefined"!=typeof e&&s.splice(e,1)},trigger:t}};for(var d="beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove".split(" "),c=0;c<d.length;c++)o.pageCallbacks[d[c]]={},t(d[c]);o.triggerPageCallbacks=function(e,a,t){var n=o.pageCallbacks[e]["*"];if(n)for(var r=0;r<n.length;r++)n[r](t);var i=o.pageCallbacks[e][a];if(i&&0!==i.length)for(var s=0;s<i.length;s++)i[s](t)},o.pageInitCallback=function(e,a){var t=a.pageContainer;if(!t.f7PageInitialized||e.params.domCache){var n={container:t,url:a.url,query:a.query||s.parseUrlQuery(a.url||""),name:s(t).attr("data-page"),view:e,from:a.position,context:a.context,navbarInnerContainer:a.navbarInnerContainer,fromPage:a.fromPage};if(t.f7PageInitialized&&e.params.domCache)return o.reinitPage(t),o.pluginHook("pageReinit",n),o.params.onPageReinit&&o.params.onPageBeforeInit(o,n),o.triggerPageCallbacks("reinit",n.name,n),void s(n.container).trigger("pageReinit",{page:n});t.f7PageInitialized=!0,t.f7PageData=n,e&&!a.preloadOnly&&(e.activePage=n),o.pluginHook("pageBeforeInit",n),o.params.onPageBeforeInit&&o.params.onPageBeforeInit(o,n),o.triggerPageCallbacks("beforeInit",n.name,n),s(n.container).trigger("pageBeforeInit",{page:n}),o.initPage(t),o.pluginHook("pageInit",n),o.params.onPageInit&&o.params.onPageInit(o,n),o.triggerPageCallbacks("init",n.name,n),s(n.container).trigger("pageInit",{page:n})}},o.pageRemoveCallback=function(e,a,t){var n;a.f7PageData&&(n=a.f7PageData.context);var r={container:a,name:s(a).attr("data-page"),view:e,url:a.f7PageData&&a.f7PageData.url,query:a.f7PageData&&a.f7PageData.query,navbarInnerContainer:a.f7PageData&&a.f7PageData.navbarInnerContainer,from:t,context:n};o.pluginHook("pageBeforeRemove",r),o.params.onPageBeforeRemove&&o.params.onPageBeforeRemove(o,r),o.triggerPageCallbacks("beforeRemove",r.name,r),s(r.container).trigger("pageBeforeRemove",{page:r})},o.pageBackCallbacks=function(e,a,t){var n,r=t.pageContainer;r.f7PageData&&(n=r.f7PageData.context);var i={container:r,name:s(r).attr("data-page"),url:r.f7PageData&&r.f7PageData.url,query:r.f7PageData&&r.f7PageData.query,view:a,from:t.position,context:n,navbarInnerContainer:r.f7PageData&&r.f7PageData.navbarInnerContainer,swipeBack:t.swipeBack};"after"===e&&(o.pluginHook("pageAfterBack",i),o.params.onPageAfterBack&&o.params.onPageAfterBack(o,i),o.triggerPageCallbacks("afterBack",i.name,i),s(r).trigger("pageAfterBack",{page:i})),"before"===e&&(o.pluginHook("pageBack",i),o.params.onPageBack&&o.params.onPageBack(o,i),o.triggerPageCallbacks("back",i.name,i),s(i.container).trigger("pageBack",{page:i}))},o.pageAnimCallbacks=function(e,a,t){var n,r=t.pageContainer;r.f7PageData&&(n=r.f7PageData.context);var i={container:r,url:t.url,query:t.query||s.parseUrlQuery(t.url||""),name:s(r).attr("data-page"),view:a,from:t.position,context:n,swipeBack:t.swipeBack,navbarInnerContainer:r.f7PageData&&r.f7PageData.navbarInnerContainer,fromPage:t.fromPage},l=t.oldPage,p=t.newPage;if(r.f7PageData=i,"after"===e&&(o.pluginHook("pageAfterAnimation",i),o.params.onPageAfterAnimation&&o.params.onPageAfterAnimation(o,i),o.triggerPageCallbacks("afterAnimation",i.name,i),s(i.container).trigger("pageAfterAnimation",{page:i})),"before"===e){s(a.container).attr("data-page",i.name),a&&(a.activePage=i),p.hasClass("no-navbar")&&!l.hasClass("no-navbar")&&a.hideNavbar(),p.hasClass("no-navbar")||!l.hasClass("no-navbar")&&!l.hasClass("no-navbar-by-scroll")||a.showNavbar(),p.hasClass("no-toolbar")&&!l.hasClass("no-toolbar")&&a.hideToolbar(),p.hasClass("no-toolbar")||!l.hasClass("no-toolbar")&&!l.hasClass("no-toolbar-by-scroll")||a.showToolbar();var d;p.hasClass("no-tabbar")&&!l.hasClass("no-tabbar")&&(d=s(a.container).find(".tabbar"),0===d.length&&(d=s(a.container).parents("."+o.params.viewsClass).find(".tabbar")),o.hideToolbar(d)),p.hasClass("no-tabbar")||!l.hasClass("no-tabbar")&&!l.hasClass("no-tabbar-by-scroll")||(d=s(a.container).find(".tabbar"),0===d.length&&(d=s(a.container).parents("."+o.params.viewsClass).find(".tabbar")),o.showToolbar(d)),l.removeClass("no-navbar-by-scroll no-toolbar-by-scroll"),o.pluginHook("pageBeforeAnimation",i),o.params.onPageBeforeAnimation&&o.params.onPageBeforeAnimation(o,i),o.triggerPageCallbacks("beforeAnimation",i.name,i),s(i.container).trigger("pageBeforeAnimation",{page:i})}},o.initPage=function(e){e=s(e),o.sizeNavbars&&o.sizeNavbars(e.parents("."+o.params.viewClass)[0]),o.initMessages&&o.initMessages(e),o.initFormsStorage&&o.initFormsStorage(e),o.initSmartSelects&&o.initSmartSelects(e),o.initSlider&&o.initSlider(e),o.initSwiper&&o.initSwiper(e),o.initPullToRefresh&&o.initPullToRefresh(e),o.initInfiniteScroll&&o.initInfiniteScroll(e),o.initSearchbar&&o.initSearchbar(e),o.initMessagebar&&o.initMessagebar(e),o.initScrollToolbars&&o.initScrollToolbars(e),o.initImagesLazyLoad&&o.initImagesLazyLoad(e)},o.reinitPage=function(e){e=s(e),o.sizeNavbars&&o.sizeNavbars(e.parents("."+o.params.viewClass)[0]),o.reinitSlider&&o.reinitSlider(e),o.reinitSwiper&&o.reinitSwiper(e),o.reinitLazyLoad&&o.reinitLazyLoad(e)},o.initPageWithCallback=function(e){e=s(e);var a=e.parents("."+o.params.viewClass);if(0!==a.length){var t=a[0].f7View||!1,n=t&&t.url?t.url:!1;a&&a.attr("data-page",e.attr("data-page")||void 0),o.pageInitCallback(t,{pageContainer:e[0],url:n,position:"center"})}},o.router={temporaryDom:document.createElement("div"),findElement:function(e,a,t,n){a=s(a),n&&(e+=":not(.cached)");var r=a.find(e);return r.length>1&&("string"==typeof t.selector&&(r=a.find(t.selector+" "+e)),r.length>1&&(r=a.find("."+o.params.viewMainClass+" "+e))),1===r.length?r:(n||(r=o.router.findElement(e,a,t,!0)),r&&1===r.length?r:void 0)},animatePages:function(e,a,t){var n="page-on-center page-on-right page-on-left";"to-left"===t&&(e.removeClass(n).addClass("page-from-center-to-left"),a.removeClass(n).addClass("page-from-right-to-center")),"to-right"===t&&(e.removeClass(n).addClass("page-from-left-to-center"),a.removeClass(n).addClass("page-from-center-to-right"))},prepareNavbar:function(e,a,t){s(e).find(".sliding").each(function(){var e=s(this),n="right"===t?this.f7NavbarRightOffset:this.f7NavbarLeftOffset;o.params.animateNavBackIcon&&(e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d("+-n+"px,0,0)"),"left"===t&&e.hasClass("center")&&s(a).find(".left .back .icon ~ span").length>0&&(n+=s(a).find(".left .back span")[0].offsetLeft)),e.transform("translate3d("+n+"px,0,0)")})},animateNavbars:function(e,a,t){var n="navbar-on-right navbar-on-center navbar-on-left";"to-left"===t&&(a.removeClass(n).addClass("navbar-from-right-to-center"),a.find(".sliding").each(function(){var e=s(this);e.transform("translate3d(0px,0,0)"),o.params.animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d(0px,0,0)")}),e.removeClass(n).addClass("navbar-from-center-to-left"),e.find(".sliding").each(function(){var e=s(this);o.params.animateNavBackIcon&&(e.hasClass("center")&&a.find(".sliding.left .back .icon").length>0&&(this.f7NavbarLeftOffset+=a.find(".sliding.left .back span")[0].offsetLeft),e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d("+-this.f7NavbarLeftOffset+"px,0,0)")),e.transform("translate3d("+this.f7NavbarLeftOffset+"px,0,0)")})),"to-right"===t&&(e.removeClass(n).addClass("navbar-from-left-to-center"),e.find(".sliding").each(function(){var e=s(this);e.transform("translate3d(0px,0,0)"),o.params.animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d(0px,0,0)")}),a.removeClass(n).addClass("navbar-from-center-to-right"),a.find(".sliding").each(function(){var e=s(this);o.params.animateNavBackIcon&&e.hasClass("left")&&e.find(".back .icon").length>0&&e.find(".back .icon").transform("translate3d("+-this.f7NavbarRightOffset+"px,0,0)"),e.transform("translate3d("+this.f7NavbarRightOffset+"px,0,0)")}))},preprocess:function(e,a,t){o.pluginHook("routerPreprocess",e,a,t),e=o.pluginProcess("preprocess",e),o.params.preprocess?(e=o.params.preprocess(e,a,t),"undefined"!=typeof e&&t(e)):t(e)},template7Render:function(e,a){{var t,n,r=a.url,i=a.content,p=a.content,d=a.context,c=a.contextName,f=a.template;a.pageName}if("string"==typeof i?r?o.template7Cache[r]?n=l.cache[r]:(n=l.compile(i),l.cache[r]=n):n=l.compile(i):f&&(n=f),d)t=d;else{if(c)if(c.indexOf(".")>=0){for(var u=c.split("."),h=l.data[u[0]],m=1;m<u.length;m++)u[m]&&(h=h[u[m]]);t=h}else t=l.data[c];if(!t&&r&&(t=l.data["url:"+r]),!t&&"string"==typeof i&&!f){var g=i.match(/(data-page=["'][^"^']*["'])/);if(g){var v=g[0].split("data-page=")[1].replace(/['"]/g,"");v&&(t=l.data["page:"+v])}}if(!t&&f&&l.templates)for(var w in l.templates)l.templates[w]===f&&(t=l.data[w]);t||(t={})}if(n&&t){if("function"==typeof t&&(t=t()),r){var b=s.parseUrlQuery(r);t.url_query={};for(var C in b)t.url_query[C]=b[C]}p=n(t)}return{content:p,context:t}}},o.router._load=function(e,a){function t(){e.allowPageChange=!0,n.removeClass("page-from-right-to-center page-on-right").addClass("page-on-center"),r.removeClass("page-from-center-to-left page-on-center").addClass("page-on-left"),f&&(d.removeClass("navbar-from-right-to-center navbar-on-left navbar-on-right").addClass("navbar-on-center"),p.removeClass("navbar-from-center-to-left navbar-on-center").addClass("navbar-on-left")),o.pageAnimCallbacks("after",e,{pageContainer:n[0],url:h,position:"right",oldPage:r,newPage:n,query:a.query,fromPage:r&&r.length&&r[0].f7PageData}),o.params.pushState&&o.pushStateClearQueue(),e.params.swipeBackPage||e.params.preloadPreviousPage||(e.params.domCache?(r.addClass("cached"),p.addClass("cached")):(0!==h.indexOf("#")||0!==n.attr("data-page").indexOf("smart-select-"))&&(o.pageRemoveCallback(e,r[0],"left"),r.remove(),f&&p.remove())),e.params.uniqueHistory&&I&&e.refreshPreviousPage()}a=a||{};var n,r,i,l,p,d,c,f,u,h=a.url,m=a.content,g={content:a.content},v=a.template,w=a.pageName,b=s(e.container),C=s(e.pagesContainer),y=a.animatePages,x="undefined"==typeof h&&m||v,T=a.pushState;if("undefined"==typeof y&&(y=e.params.animatePages),o.pluginHook("routerLoad",e,a),(o.params.template7Pages&&"string"==typeof m||v)&&(g=o.router.template7Render(e,a),g.content&&!m&&(m=g.content)),o.router.temporaryDom.innerHTML="",!w)if(h||"string"==typeof m)o.router.temporaryDom.innerHTML=g.content;else if("length"in m&&m.length>1)for(var k=0;k<m.length;k++)s(o.router.temporaryDom).append(m[k]);else s(o.router.temporaryDom).append(m);if(u=a.reload&&(a.reloadPrevious?"left":"center"),n=w?C.find('.page[data-page="'+w+'"]'):o.router.findElement(".page",o.router.temporaryDom,e),!n||0===n.length||w&&e.activePage&&e.activePage.name===w)return void(e.allowPageChange=!0);
if(n.addClass(a.reload?"page-on-"+u:"page-on-right"),i=C.children(".page:not(.cached)"),a.reload&&a.reloadPrevious&&1===i.length)return void(e.allowPageChange=!0);if(a.reload)r=i.eq(i.length-1);else{if(i.length>1){for(l=0;l<i.length-2;l++)e.params.domCache?s(i[l]).addClass("cached"):(o.pageRemoveCallback(e,i[l],"left"),s(i[l]).remove());e.params.domCache?s(i[l]).addClass("cached"):(o.pageRemoveCallback(e,i[l],"left"),s(i[l]).remove())}r=C.children(".page:not(.cached)")}if(e.params.domCache&&n.removeClass("cached"),e.params.dynamicNavbar)if(f=!0,d=w?b.find('.navbar-inner[data-page="'+w+'"]'):o.router.findElement(".navbar-inner",o.router.temporaryDom,e),d&&0!==d.length||(f=!1),c=b.find(".navbar"),a.reload)p=c.find(".navbar-inner:not(.cached):last-child");else if(p=c.find(".navbar-inner:not(.cached)"),p.length>0){for(l=0;l<p.length-1;l++)e.params.domCache?s(p[l]).addClass("cached"):s(p[l]).remove();d||1!==p.length||(e.params.domCache?s(p[0]).addClass("cached"):s(p[0]).remove()),p=c.find(".navbar-inner:not(.cached)")}if(f&&(d.addClass(a.reload?"navbar-on-"+u:"navbar-on-right"),e.params.domCache&&d.removeClass("cached"),n[0].f7RelatedNavbar=d[0],d[0].f7RelatedPage=n[0]),!h){var S=w||n.attr("data-page");h=x?"#"+o.params.dynamicPageUrl.replace(/{{name}}/g,S).replace(/{{index}}/g,e.history.length-(a.reload?1:0)):"#"+S,e.params.domCache||(e.contentCache[h]=m),e.params.domCache&&w&&(e.pagesCache[h]=w)}if(o.params.pushState&&!a.reloadPrevious&&e.main){"undefined"==typeof T&&(T=!0);var P=o.params.pushStateRoot||"",M=a.reload?"replaceState":"pushState";T&&(x||w?x&&m?history[M]({content:m,url:h,viewIndex:o.views.indexOf(e)},"",P+o.params.pushStateSeparator+h):w&&history[M]({pageName:w,url:h,viewIndex:o.views.indexOf(e)},"",P+o.params.pushStateSeparator+h):history[M]({url:h,viewIndex:o.views.indexOf(e)},"",P+o.params.pushStateSeparator+h))}if(e.url=h,a.reload){var O=e.history[e.history.length-(a.reloadPrevious?2:1)];O&&0===O.indexOf("#")&&O in e.contentCache&&O!==h&&(e.contentCache[O]=null,delete e.contentCache[O]),e.history[e.history.length-(a.reloadPrevious?2:1)]=h}else e.history.push(h);var I=!1;if(e.params.uniqueHistory){var D=e.history,E=h;if(e.params.uniqueHistoryIgnoreGetParameters)for(D=[],E=h.split("?")[0],l=0;l<e.history.length;l++)D.push(e.history[l].split("?")[0]);D.indexOf(E)!==D.lastIndexOf(E)&&(e.history=e.history.slice(0,D.indexOf(E)),e.history.push(h),I=!0)}if(a.reloadPrevious?(r=r.prev(".page"),n.insertBefore(r),f&&(p=p.prev(".navbar-inner"),d.insertAfter(p))):(C.append(n[0]),f&&c.append(d[0])),a.reload&&(e.params.domCache&&e.initialPages.indexOf(r[0])>=0?(r.addClass("cached"),f&&p.addClass("cached")):(o.pageRemoveCallback(e,r[0],u),r.remove(),f&&p.remove())),o.pageInitCallback(e,{pageContainer:n[0],url:h,position:a.reload?u:"right",navbarInnerContainer:f?d[0]:void 0,context:g.context,query:a.query,fromPage:r&&r.length&&r[0].f7PageData}),f&&o.navbarInitCallback(e,n[0],c[0],d[0],h,a.reload?u:"right"),a.reload)return e.allowPageChange=!0,void(I&&e.refreshPreviousPage());f&&y&&o.router.prepareNavbar(d,p,"right");n[0].clientLeft;o.pageAnimCallbacks("before",e,{pageContainer:n[0],url:h,position:"right",oldPage:r,newPage:n,query:a.query,fromPage:r&&r.length&&r[0].f7PageData}),y?(o.router.animatePages(r,n,"to-left",e),f&&setTimeout(function(){o.router.animateNavbars(p,d,"to-left",e)},0),n.animationEnd(function(){t()})):(d.find(".sliding, .sliding .back .icon").transform(""),t())},o.router.load=function(e,a){function t(t){o.router.preprocess(t,n,function(t){a.content=t,o.router._load(e,a)})}a=a||{};var n=a.url,r=a.content,i=a.pageName;i&&i.indexOf("?")>0&&(a.query=s.parseUrlQuery(i),a.pageName=i=i.split("?")[0]);var l=a.template;return e.params.reloadPages===!0&&(a.reload=!0),e.allowPageChange&&(!n||e.url!==n||a.reload||e.params.allowDuplicateUrls)?(e.allowPageChange=!1,o.xhr&&e.xhr&&e.xhr===o.xhr&&(o.xhr.abort(),o.xhr=!1),r||i?void t(r):l?void o.router._load(e,a):a.url&&"#"!==a.url?void o.get(a.url,e,a.ignoreCache,function(a,n){return n?void(e.allowPageChange=!0):void t(a)}):void(e.allowPageChange=!0)):!1},o.router._back=function(e,a){function t(){o.pageBackCallbacks("after",e,{pageContainer:l[0],url:m,position:"center",oldPage:l,newPage:p}),o.pageAnimCallbacks("after",e,{pageContainer:p[0],url:m,position:"left",oldPage:l,newPage:p,query:a.query,fromPage:l&&l.length&&l[0].f7PageData}),o.router.afterBack(e,l[0],p[0])}function n(){o.pageBackCallbacks("before",e,{pageContainer:l[0],url:m,position:"center",oldPage:l,newPage:p}),o.pageAnimCallbacks("before",e,{pageContainer:p[0],url:m,position:"left",oldPage:l,newPage:p,query:a.query,fromPage:l&&l.length&&l[0].f7PageData}),b?(o.router.animatePages(p,l,"to-right",e),h&&setTimeout(function(){o.router.animateNavbars(c,d,"to-right",e)},0),p.animationEnd(function(){t()})):(c.find(".sliding, .sliding .back .icon").transform(""),t())}function r(){if(o.router.temporaryDom.innerHTML="",m||"string"==typeof g)o.router.temporaryDom.innerHTML=v.content;else if("length"in g&&g.length>1)for(var a=0;a<g.length;a++)s(o.router.temporaryDom).append(g[a]);else s(o.router.temporaryDom).append(g);p=o.router.findElement(".page",o.router.temporaryDom,e),e.params.dynamicNavbar&&(c=o.router.findElement(".navbar-inner",o.router.temporaryDom,e))}function i(){if(!p||0===p.length)return void(e.allowPageChange=!0);if(e.params.dynamicNavbar&&"undefined"==typeof h&&(h=c&&0!==c.length?!0:!1),p.addClass("page-on-left").removeClass("cached"),h&&(f=k.find(".navbar"),u=k.find(".navbar-inner:not(.cached)"),c.addClass("navbar-on-left").removeClass("cached")),x){var t,r;t=s(P[P.length-2]),h&&(r=s(t[0]&&t[0].f7RelatedNavbar||u[u.length-2])),e.params.domCache&&e.initialPages.indexOf(t[0])>=0?(t.length&&t[0]!==p[0]&&t.addClass("cached"),h&&r.length&&r[0]!==c[0]&&r.addClass("cached")):(t.length&&t.remove(),h&&r.length&&r.remove()),P=S.children(".page:not(.cached)"),h&&(u=k.find(".navbar-inner:not(.cached)")),e.history.indexOf(m)>=0?e.history=e.history.slice(0,e.history.indexOf(m)+2):e.history[[e.history.length-2]]?e.history[e.history.length-2]=m:e.history.unshift(m)}if(l=s(P[P.length-1]),e.params.domCache&&l[0]===p[0]&&(l=S.children(".page.page-on-center"),0===l.length&&e.activePage&&(l=s(e.activePage.container))),h&&!d&&(d=s(u[u.length-1]),e.params.domCache&&(d[0]===c[0]&&(d=f.children(".navbar-inner.navbar-on-center:not(.cached)")),0===d.length&&(d=f.children('.navbar-inner[data-page="'+l.attr("data-page")+'"]'))),(0===d.length||c[0]===d[0])&&(h=!1)),h&&(M&&c.insertBefore(d),c[0].f7RelatedPage=p[0],p[0].f7RelatedNavbar=c[0]),M&&p.insertBefore(l),o.pageInitCallback(e,{pageContainer:p[0],url:m,position:"left",navbarInnerContainer:h?c[0]:void 0,context:v.context,query:a.query,fromPage:l&&l.length&&l[0].f7PageData,preloadOnly:C}),h&&o.navbarInitCallback(e,p[0],f[0],c[0],m,"right"),h&&c.hasClass("navbar-on-left")&&b&&o.router.prepareNavbar(c,d,"left"),C)return void(e.allowPageChange=!0);e.url=m;p[0].clientLeft;n()}a=a||{};var l,p,d,c,f,u,h,m=a.url,g=a.content,v={content:a.content},w=a.template,b=a.animatePages,C=a.preloadOnly,y=a.pushState,x=(a.ignoreCache,a.force),T=a.pageName,k=s(e.container),S=s(e.pagesContainer),P=S.children(".page:not(.cached)"),M=!0;return"undefined"==typeof b&&(b=e.params.animatePages),o.pluginHook("routerBack",e,a),(o.params.template7Pages&&"string"==typeof g||w)&&(v=o.router.template7Render(e,a),v.content&&!g&&(g=v.content)),o.params.pushState&&("undefined"==typeof y&&(y=!0),!C&&history.state&&y&&history.back()),P.length>1&&!x?C?void(e.allowPageChange=!0):(e.url=e.history[e.history.length-2],m=e.url,p=s(P[P.length-2]),l=s(P[P.length-1]),e.params.dynamicNavbar&&(h=!0,u=k.find(".navbar-inner:not(.cached)"),c=s(u[0]),d=s(u[1]),(0===c.length||0===d.length||d[0]===c[0])&&(h=!1)),M=!1,void i()):x?m&&m===e.url||T&&e.activePage&&e.activePage.name===T?void(e.allowPageChange=!0):g?(r(),void i()):T&&e.params.domCache?(T&&(m="#"+T),p=s(k).find('.page[data-page="'+T+'"]'),p[0].f7PageData&&p[0].f7PageData.url&&(m=p[0].f7PageData.url),e.params.dynamicNavbar&&(c=s(k).find('.navbar-inner[data-page="'+T+'"]'),0===c.length&&(c=s(p[0].f7RelatedNavbar))),void i()):void(e.allowPageChange=!0):(C||(e.url=e.history[e.history.length-2],m=e.url),g?(r(),void i()):T?(p=s(k).find('.page[data-page="'+T+'"]'),e.params.dynamicNavbar&&(c=s(k).find('.navbar-inner[data-page="'+T+'"]')),void i()):void(e.allowPageChange=!0))},o.router.back=function(e,a){function t(t){o.router.preprocess(t,n,function(t){a.content=t,o.router._back(e,a)})}a=a||{};var n=a.url,r=a.content,i=a.pageName;i&&i.indexOf("?")>0&&(a.query=s.parseUrlQuery(i),a.pageName=i=i.split("?")[0]);var l=a.force;if(!e.allowPageChange)return!1;e.allowPageChange=!1,o.xhr&&e.xhr&&e.xhr===o.xhr&&(o.xhr.abort(),o.xhr=!1);var p=s(e.pagesContainer).find(".page:not(.cached)");if(p.length>1&&!l)return void o.router._back(e,a);if(l){if(!n&&r)return void t(r);if(!n&&i)return i&&(n="#"+i),void t();if(n)return void o.get(a.url,e,a.ignoreCache,function(a,n){return n?void(e.allowPageChange=!0):void t(a)})}else{if(n=a.url=e.history[e.history.length-2],!n)return void(e.allowPageChange=!0);if(0===n.indexOf("#")&&e.contentCache[n])return void t(e.contentCache[n]);if(0===n.indexOf("#")&&e.params.domCache)return i||(a.pageName=n.split("#")[1]),void t();if(0!==n.indexOf("#"))return void o.get(a.url,e,a.ignoreCache,function(a,n){return n?void(e.allowPageChange=!0):void t(a)})}e.allowPageChange=!0},o.router.afterBack=function(e,a,t){a=s(a),t=s(t),e.params.domCache&&e.initialPages.indexOf(a[0])>=0?a.removeClass("page-from-center-to-right").addClass("cached"):(a.remove(),o.pageRemoveCallback(e,a[0],"right")),t.removeClass("page-from-left-to-center page-on-left").addClass("page-on-center"),e.allowPageChange=!0;var n,r=e.history.pop();if(e.params.dynamicNavbar){var i=s(e.container).find(".navbar-inner:not(.cached)"),l=s(a[0].f7RelatedNavbar||i[1]);e.params.domCache&&e.initialNavbars.indexOf(l[0])>=0?l.removeClass("navbar-from-center-to-right").addClass("cached"):l.remove(),n=s(i[0]).removeClass("navbar-on-left navbar-from-left-to-center").addClass("navbar-on-center")}if(e.params.domCache&&s(e.container).find(".page.cached").each(function(){var a=s(this),t=(a.index(),a[0].f7PageData&&a[0].f7PageData.url);t&&e.history.indexOf(t)<0&&e.initialPages.indexOf(this)<0&&(a[0].f7RelatedNavbar&&s(a[0].f7RelatedNavbar).remove(),a.remove())}),!e.params.domCache&&r&&r.indexOf("#")>-1&&r in e.contentCache&&(e.contentCache[r]=null,delete e.contentCache[r]),o.params.pushState&&o.pushStateClearQueue(),e.params.preloadPreviousPage)if(e.params.domCache&&e.history.length>1){var p,d,c=e.history[e.history.length-2];c&&e.pagesCache[c]?(p=s(e.container).find('.page[data-page="'+e.pagesCache[c]+'"]'),p.insertBefore(t),n&&(d=s(e.container).find('.navbar-inner[data-page="'+e.pagesCache[c]+'"]'),d.insertBefore(n),d&&0!==d.length||(d=n.prev(".navbar-inner.cached")))):(p=t.prev(".page.cached"),n&&(d=n.prev(".navbar-inner.cached"))),p&&p.length>0&&p.removeClass("cached page-on-right page-on-center").addClass("page-on-left"),d&&d.length>0&&d.removeClass("cached navbar-on-right navbar-on-center").addClass("navbar-on-left")}else o.router.back(e,{preloadOnly:!0})};var f=document.createElement("div");o.modalStack=[],o.modalStackClearQueue=function(){o.modalStack.length&&o.modalStack.shift()()},o.modal=function(e){e=e||{};var a="";if(o.params.modalTemplate)o._compiledTemplates.modal||(o._compiledTemplates.modal=l.compile(o.params.modalTemplate)),a=o._compiledTemplates.modal(e);else{var t="";if(e.buttons&&e.buttons.length>0)for(var n=0;n<e.buttons.length;n++)t+='<span class="modal-button'+(e.buttons[n].bold?" modal-button-bold":"")+'">'+e.buttons[n].text+"</span>";var r=e.title?'<div class="modal-title">'+e.title+"</div>":"",i=e.text?'<div class="modal-text">'+e.text+"</div>":"",p=e.afterText?e.afterText:"",d=e.buttons&&0!==e.buttons.length?"":"modal-no-buttons",c=e.verticalButtons?"modal-buttons-vertical":"";a='<div class="modal '+d+'"><div class="modal-inner">'+(r+i+p)+'</div><div class="modal-buttons '+c+'">'+t+"</div></div>"}f.innerHTML=a;var u=s(f).children();return s("body").append(u[0]),u.find(".modal-button").each(function(a,t){s(t).on("click",function(t){e.buttons[a].close!==!1&&o.closeModal(u),e.buttons[a].onClick&&e.buttons[a].onClick(u,t),e.onClick&&e.onClick(u,a)})}),o.openModal(u),u[0]},o.alert=function(e,a,t){return"function"==typeof a&&(t=arguments[1],a=void 0),o.modal({text:e||"",title:"undefined"==typeof a?o.params.modalTitle:a,buttons:[{text:o.params.modalButtonOk,bold:!0,onClick:t}]})},o.confirm=function(e,a,t,n){return"function"==typeof a&&(n=arguments[2],t=arguments[1],a=void 0),o.modal({text:e||"",title:"undefined"==typeof a?o.params.modalTitle:a,buttons:[{text:o.params.modalButtonCancel,onClick:n},{text:o.params.modalButtonOk,bold:!0,onClick:t}]})},o.prompt=function(e,a,t,n){return"function"==typeof a&&(n=arguments[2],t=arguments[1],a=void 0),o.modal({text:e||"",title:"undefined"==typeof a?o.params.modalTitle:a,afterText:'<input type="text" class="modal-text-input">',buttons:[{text:o.params.modalButtonCancel},{text:o.params.modalButtonOk,bold:!0}],onClick:function(e,a){0===a&&n&&n(s(e).find(".modal-text-input").val()),1===a&&t&&t(s(e).find(".modal-text-input").val())}})},o.modalLogin=function(e,a,t,n){return"function"==typeof a&&(n=arguments[2],t=arguments[1],a=void 0),o.modal({text:e||"",title:"undefined"==typeof a?o.params.modalTitle:a,afterText:'<input type="text" name="modal-username" placeholder="'+o.params.modalUsernamePlaceholder+'" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="'+o.params.modalPasswordPlaceholder+'" class="modal-text-input modal-text-input-double">',buttons:[{text:o.params.modalButtonCancel},{text:o.params.modalButtonOk,bold:!0}],onClick:function(e,a){var r=s(e).find('.modal-text-input[name="modal-username"]').val(),o=s(e).find('.modal-text-input[name="modal-password"]').val();0===a&&n&&n(r,o),1===a&&t&&t(r,o)}})},o.modalPassword=function(e,a,t,n){return"function"==typeof a&&(n=arguments[2],t=arguments[1],a=void 0),o.modal({text:e||"",title:"undefined"==typeof a?o.params.modalTitle:a,afterText:'<input type="password" name="modal-password" placeholder="'+o.params.modalPasswordPlaceholder+'" class="modal-text-input">',buttons:[{text:o.params.modalButtonCancel},{text:o.params.modalButtonOk,bold:!0}],onClick:function(e,a){var r=s(e).find('.modal-text-input[name="modal-password"]').val();0===a&&n&&n(r),1===a&&t&&t(r)}})},o.showPreloader=function(e){return o.modal({title:e||o.params.modalPreloaderTitle,text:'<div class="preloader"></div>'})},o.hidePreloader=function(){o.closeModal(".modal.modal-in")},o.showIndicator=function(){s("body").append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>')},o.hideIndicator=function(){s(".preloader-indicator-overlay, .preloader-indicator-modal").remove()},o.actions=function(e,a){var t,n,r,i=!1;1===arguments.length?a=e:o.device.ios?o.device.ipad&&(i=!0):s(window).width()>=768&&(i=!0),a=a||[],a.length>0&&!s.isArray(a[0])&&(a=[a]);var p;if(i){var d='<div class="popover actions-popover"><div class="popover-inner">{{#each this}}<div class="list-block"><ul>{{#each this}}{{#if label}}<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>{{else}}<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</a></li>{{/if}}{{/each}}</ul></div>{{/each}}</div></div>';o._compiledTemplates.actionsPopover||(o._compiledTemplates.actionsPopover=l.compile(d));var c=o._compiledTemplates.actionsPopover(a);t=s(o.popover(c,e,!0)),n=".list-block ul",r=".list-button"}else{if(o.params.modalActionsTemplate)o._compiledTemplates.actions||(o._compiledTemplates.actions=l.compile(o.params.modalActionsTemplate)),p=o._compiledTemplates.actions(a);else{for(var u="",h=0;h<a.length;h++)for(var m=0;m<a[h].length;m++){0===m&&(u+='<div class="actions-modal-group">');var g=a[h][m],v=g.label?"actions-modal-label":"actions-modal-button";g.bold&&(v+=" actions-modal-button-bold"),g.color&&(v+=" color-"+g.color),g.bg&&(v+=" bg-"+g.bg),u+='<span class="'+v+'">'+g.text+"</span>",m===a[h].length-1&&(u+="</div>")}p='<div class="actions-modal">'+u+"</div>"}f.innerHTML=p,t=s(f).children(),s("body").append(t[0]),n=".actions-modal-group",r=".actions-modal-button"}var w=t.find(n);return w.each(function(e,n){var l=e;s(n).children().each(function(e,n){var p,d=e,c=a[l][d];!i&&s(n).is(r)&&(p=s(n)),i&&s(n).find(r).length>0&&(p=s(n).find(r)),p&&p.on("click",function(e){c.close!==!1&&o.closeModal(t),c.onClick&&c.onClick(t,e)})})}),i||o.openModal(t),t[0]},o.popover=function(e,a,t){function n(){e.css({left:"",top:""});var t,n,r=e.width(),o=e.height(),i=e.find(".popover-angle"),l=i.width()/2;i.removeClass("on-left on-right on-top on-bottom").css({left:"",top:""});var p=a.outerWidth(),d=a.outerHeight(),c=a.offset(),f=a.parents(".page");f.length>0&&(c.top=c.top-f[0].scrollTop);var u=s(window).height(),h=s(window).width(),m=0,g=0,v=0,w="top";o+l<c.top?m=c.top-o-l:o+l<u-c.top-d?(w="bottom",m=c.top+d+l):(w="middle",m=d/2+c.top-o/2,v=m,0>m?m=5:m+o>u&&(m=u-o-5),v-=m),"top"===w||"bottom"===w?(g=p/2+c.left-r/2,v=g,5>g&&(g=5),g+r>h&&(g=h-r-5),"top"===w&&i.addClass("on-bottom"),"bottom"===w&&i.addClass("on-top"),v-=g,t=r/2-l+v,t=Math.max(Math.min(t,r-2*l-6),6),i.css({left:t+"px"})):"middle"===w&&(g=c.left-r-l,i.addClass("on-right"),5>g&&(g=c.left+p+l,i.removeClass("on-right").addClass("on-left")),g+r>h&&(g=h-r-5,i.removeClass("on-right").addClass("on-left")),n=o/2-l+v,n=Math.max(Math.min(n,o-2*l-6),6),i.css({top:n+"px"})),e.css({top:m+"px",left:g+"px"})}if("undefined"==typeof t&&(t=!0),"string"==typeof e&&e.indexOf("<")>=0){var r=document.createElement("div");if(r.innerHTML=e.trim(),!(r.childNodes.length>0))return!1;e=r.childNodes[0],t&&e.classList.add("remove-on-close"),s("body").append(e)}return e=s(e),a=s(a),0===e.length||0===a.length?!1:(0===e.find(".popover-angle").length&&e.append('<div class="popover-angle"></div>'),e.show(),n(),s(window).on("resize",n),e.on("close",function(){s(window).off("resize",n)}),e.find("."+o.params.viewClass).length>0&&o.sizeNavbars(e.find("."+o.params.viewClass)[0]),o.openModal(e),e[0])},o.popup=function(e,a){if("undefined"==typeof a&&(a=!0),"string"==typeof e&&e.indexOf("<")>=0){var t=document.createElement("div");if(t.innerHTML=e.trim(),!(t.childNodes.length>0))return!1;e=t.childNodes[0],a&&e.classList.add("remove-on-close"),s("body").append(e)}return e=s(e),0===e.length?!1:(e.show(),e.find("."+o.params.viewClass).length>0&&o.sizeNavbars(e.find("."+o.params.viewClass)[0]),o.openModal(e),e[0])},o.pickerModal=function(e,a){if("undefined"==typeof a&&(a=!0),"string"==typeof e&&e.indexOf("<")>=0){if(e=s(e),!(e.length>0))return!1;a&&e.addClass("remove-on-close"),s("body").append(e[0])}return e=s(e),0===e.length?!1:(e.show(),o.openModal(e),e[0])},o.loginScreen=function(e){return e||(e=".login-screen"),e=s(e),0===e.length?!1:(e.show(),e.find("."+o.params.viewClass).length>0&&o.sizeNavbars(e.find("."+o.params.viewClass)[0]),o.openModal(e),e[0])},o.openModal=function(e){e=s(e);var a=e.hasClass("modal");if(s(".modal.modal-in:not(.modal-out)").length&&o.params.modalStack&&a)return void o.modalStack.push(function(){o.openModal(e)});var t=(e.hasClass("popover"),e.hasClass("popup")),n=e.hasClass("login-screen"),r=e.hasClass("picker-modal");a&&(e.show(),e.css({marginTop:-Math.round(e.outerHeight()/2)+"px"}));var i;n||r||(0!==s(".modal-overlay").length||t||s("body").append('<div class="modal-overlay"></div>'),0===s(".popup-overlay").length&&t&&s("body").append('<div class="popup-overlay"></div>'),i=s(t?".popup-overlay":".modal-overlay"));e[0].clientLeft;return e.trigger("open"),r&&s("body").addClass("with-picker-modal"),n||r||i.addClass("modal-overlay-visible"),e.removeClass("modal-out").addClass("modal-in").transitionEnd(function(){e.trigger(e.hasClass("modal-out")?"closed":"opened")}),!0},o.closeModal=function(e){if(e=s(e||".modal-in"),"undefined"==typeof e||0!==e.length){var a=e.hasClass("modal"),t=e.hasClass("popover"),n=e.hasClass("popup"),r=e.hasClass("login-screen"),i=e.hasClass("picker-modal"),l=e.hasClass("remove-on-close"),p=s(n?".popup-overlay":".modal-overlay");return n?e.length===s(".popup.modal-in").length&&p.removeClass("modal-overlay-visible"):i||p.removeClass("modal-overlay-visible"),e.trigger("close"),i&&(s("body").removeClass("with-picker-modal"),s("body").addClass("picker-modal-closing")),t?(e.removeClass("modal-in modal-out").trigger("closed").hide(),l&&e.remove()):(e.removeClass("modal-in").addClass("modal-out").transitionEnd(function(){e.trigger(e.hasClass("modal-out")?"closed":"opened"),i&&s("body").removeClass("picker-modal-closing"),n||r||i?(e.removeClass("modal-out").hide(),l&&e.length>0&&e.remove()):e.remove()}),a&&o.params.modalStack&&o.modalStackClearQueue()),!0}},o.allowPanelOpen=!0,o.openPanel=function(e){function a(){r.transitionEnd(function(e){s(e.target).is(r)?(t.trigger(t.hasClass("active")?"opened":"closed"),o.allowPanelOpen=!0):a()})}if(!o.allowPanelOpen)return!1;var t=s(".panel-"+e);if(0===t.length||t.hasClass("active"))return!1;o.closePanel(),o.allowPanelOpen=!1;var n=t.hasClass("panel-reveal")?"reveal":"cover";t.css({display:"block"}).addClass("active"),t.trigger("open"),t.find("."+o.params.viewClass).length>0&&o.sizeNavbars&&o.sizeNavbars(t.find("."+o.params.viewClass)[0]);var r=(t[0].clientLeft,"reveal"===n?s("."+o.params.viewsClass):t);return a(),s("body").addClass("with-panel-"+e+"-"+n),!0},o.closePanel=function(){var e=s(".panel.active");if(0===e.length)return!1;var a=e.hasClass("panel-reveal")?"reveal":"cover",t=e.hasClass("panel-left")?"left":"right";e.removeClass("active");var n="reveal"===a?s("."+o.params.viewsClass):e;e.trigger("close"),o.allowPanelOpen=!1,n.transitionEnd(function(){e.hasClass("active")||(e.css({display:""}),e.trigger("closed"),s("body").removeClass("panel-closing"),o.allowPanelOpen=!0)}),s("body").addClass("panel-closing").removeClass("with-panel-"+t+"-"+a)},o.initSwipePanels=function(){function e(e){if(o.allowPanelOpen&&(o.params.swipePanel||o.params.swipePanelOnlyClose)&&!i&&!(s(".modal-in, .photo-browser-in").length>0||!o.params.swipePanelCloseOpposite&&!o.params.swipePanelOnlyClose&&s(".panel.active").length>0&&!n.hasClass("active"))){if(w.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,w.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,o.params.swipePanelCloseOpposite||o.params.swipePanelOnlyClose){if(s(".panel.active").length>0)r=s(".panel.active").hasClass("panel-left")?"left":"right";else{if(o.params.swipePanelOnlyClose)return;r=o.params.swipePanel}if(!r)return}if(n=s(".panel.panel-"+r),u=n.hasClass("active"),o.params.swipePanelActiveArea&&!u){if("left"===r&&w.x>o.params.swipePanelActiveArea)return;if("right"===r&&w.x<window.innerWidth-o.params.swipePanelActiveArea)return}l=!1,i=!0,p=void 0,d=(new Date).getTime(),g=void 0}}function a(e){if(i&&!e.f7PreventPanelSwipe){var a="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,t="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY;if("undefined"==typeof p&&(p=!!(p||Math.abs(t-w.y)>Math.abs(a-w.x))),p)return void(i=!1);if(!g&&(g=a>w.x?"to-right":"to-left","left"===r&&"to-left"===g&&!n.hasClass("active")||"right"===r&&"to-right"===g&&!n.hasClass("active")))return void(i=!1);if(o.params.swipePanelNoFollow){var s=(new Date).getTime()-d;return 300>s&&("to-left"===g&&("right"===r&&o.openPanel(r),"left"===r&&n.hasClass("active")&&o.closePanel()),"to-right"===g&&("left"===r&&o.openPanel(r),"right"===r&&n.hasClass("active")&&o.closePanel())),i=!1,void(l=!1)}l||(m=n.hasClass("panel-cover")?"cover":"reveal",u||(n.show(),v.show()),h=n[0].offsetWidth,n.transition(0),n.find("."+o.params.viewClass).length>0&&o.sizeNavbars&&o.sizeNavbars(n.find("."+o.params.viewClass)[0])),l=!0,e.preventDefault();var C=u?0:-o.params.swipePanelThreshold;"right"===r&&(C=-C),c=a-w.x+C,"right"===r?(f=c-(u?h:0),f>0&&(f=0),-h>f&&(f=-h)):(f=c+(u?h:0),0>f&&(f=0),f>h&&(f=h)),"reveal"===m?(b.transform("translate3d("+f+"px,0,0)").transition(0),v.transform("translate3d("+f+"px,0,0)"),o.pluginHook("swipePanelSetTransform",b[0],n[0],Math.abs(f/h))):(n.transform("translate3d("+f+"px,0,0)").transition(0),o.pluginHook("swipePanelSetTransform",b[0],n[0],Math.abs(f/h)))}}function t(){if(!i||!l)return i=!1,void(l=!1);i=!1,l=!1;var e,a=(new Date).getTime()-d,t=0===f||Math.abs(f)===h;if(e=u?f===-h?"reset":300>a&&Math.abs(f)>=0||a>=300&&Math.abs(f)<=h/2?"left"===r&&f===h?"reset":"swap":"reset":0===f?"reset":300>a&&Math.abs(f)>0||a>=300&&Math.abs(f)>=h/2?"swap":"reset","swap"===e&&(o.allowPanelOpen=!0,u?(o.closePanel(),t&&(n.css({display:""}),s("body").removeClass("panel-closing"))):o.openPanel(r),t&&(o.allowPanelOpen=!0)),"reset"===e)if(u)o.allowPanelOpen=!0,o.openPanel(r);else if(o.closePanel(),t)o.allowPanelOpen=!0,n.css({display:""});else{var p="reveal"===m?b:n;s("body").addClass("panel-closing"),p.transitionEnd(function(){o.allowPanelOpen=!0,n.css({display:""}),s("body").removeClass("panel-closing")})}"reveal"===m&&(b.transition(""),b.transform("")),n.transition("").transform(""),v.css({display:""}).transform("")}var n,r;if(o.params.swipePanel){if(n=s(".panel.panel-"+o.params.swipePanel),r=o.params.swipePanel,0===n.length)return}else{if(!o.params.swipePanelOnlyClose)return;if(0===s(".panel").length)return}var i,l,p,d,c,f,u,h,m,g,v=s(".panel-overlay"),w={},b=s("."+o.params.viewsClass);s(document).on(o.touchEvents.start,e),s(document).on(o.touchEvents.move,a),s(document).on(o.touchEvents.end,t)},o.initImagesLazyLoad=function(e){function a(e){function t(){e.removeClass("lazy").addClass("lazy-loaded"),n?e.css("background-image","url("+r+")"):e.attr("src",r),o.params.imagesLazyLoadSequential&&(f=!1,c.length>0&&a(c.shift()))}e=s(e);var n=e.attr("data-background"),r=n?n:e.attr("data-src");if(r){if(!o.params.imagesLazyLoadSequential)return void t();if(f)return void(c.indexOf(e[0])<0&&c.push(e[0]));f=!0;var i=new Image;i.onload=t,i.onerror=t,i.src=r}}function t(){l=e.find(".lazy"),l.each(function(e,t){t=s(t),n(t[0])&&a(t)})}function n(e){var a=e.getBoundingClientRect(),t=o.params.imagesLazyLoadThreshold||0;return a.top>=0-t&&a.left>=0-t&&a.top<=window.innerHeight+t&&a.left<=window.innerWidth+t}function r(e){var a=e?"off":"on";l[a]("lazy",t),p[a]("lazy",t),p[a]("scroll",t),s(window)[a]("resize",t)}function i(){r(!0)}e=s(e);var l;if(e.hasClass("lazy")?(l=e,e=l.parents(".page")):l=e.find(".lazy"),0!==l.length){var p;if(e.hasClass("page-content")?(p=e,e=e.parents(".page")):p=e.find(".page-content"),0!==p.length){var d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==";"string"==typeof o.params.imagesLazyLoadPlaceholder&&(d=o.params.imagesLazyLoadPlaceholder),o.params.imagesLazyLoadPlaceholder!==!1&&l.attr("src",d);var c=[],f=!1;e[0].f7DestroyImagesLazyLoad=i,r(),e.hasClass("page")&&e.once("pageBeforeRemove",i),t(),e.once("pageAfterAnimation",t)}}},o.destroyImagesLazyLoad=function(e){e=s(e),e.length>0&&e[0].f7DestroyImagesLazyLoad&&e[0].f7DestroyLazyLoad()},o.reinitImagesLazyLoad=function(e){e=s(e),e.length>0&&e.trigger("lazy")},o.initMessages=function(e){var a=s(e),t=a.find(".messages");if(0!==t.length){var n=a.find(".page-content");t.hasClass("messages-auto-layout")&&o.updateMessagesLayout(t),t.hasClass("new-messages-first")||(n[0].scrollTop=n[0].scrollHeight-n[0].offsetHeight)}},o.addMessage=function(e,a,t){if(e=e||{},e.type=e.type||"sent",!e.text||0===e.length)return!1;if(a=s(a||".messages-content"),0===a.length)return!1;var n=a.find(".messages"),r=n.hasClass("new-messages-first");"undefined"==typeof t&&(t=r?!0:!1);var i=t?"prepend":"append",l="";e.day&&(l+='<div class="messages-date">'+e.day+(e.time?",":"")+(e.time?" <span>"+e.time+"</span>":"")+"</div>");var p=e.text.indexOf("<img")>=0?"message-pic":"",d=e.avatar?"message-with-avatar":"",c="message message-"+e.type+" "+p+" "+d+" message-appear-from-"+("append"===i?"bottom":"top");l+='<div class="'+c+'">'+(e.name?'<div class="message-name">'+e.name+"</div>":"")+'<div class="message-text">'+e.text+"</div>"+(e.avatar?'<div class="message-avatar" style="background-image:url('+e.avatar+')"></div>':"")+(e.label?'<div class="message-label">'+e.label+"</div>":"")+"</div>",n[i](l),n.hasClass("messages-auto-layout")&&o.updateMessagesLayout(n),("append"===i&&!r||"prepend"===i&&r)&&o.scrollMessagesContainer(a)},o.updateMessagesLayout=function(e){e.find(".message").each(function(){var e=s(this);e.find(".message-text img").length>0&&e.addClass("message-pic"),e.find(".message-avatar").length>0&&e.addClass("message-with-avatar")}),e.find(".message-sent").each(function(){var e=s(this),a=e.next(".message-sent"),t=e.prev(".message-sent");0===a.length?e.addClass("message-last message-with-tail"):e.removeClass("message-last message-with-tail"),0===t.length?e.addClass("message-first"):e.removeClass("message-first"),t.length>0&&t.find(".message-name").length>0&&e.find(".message-name").length>0&&t.find(".message-name").text()!==e.find(".message-name").text()&&(t.addClass("message-last message-with-tail"),e.addClass("message-first"))}),e.find(".message-received").each(function(){var e=s(this),a=e.next(".message-received"),t=e.prev(".message-received");0===a.length?e.addClass("message-last message-with-tail"):e.removeClass("message-last message-with-tail"),0===t.length?e.addClass("message-first"):e.removeClass("message-first"),t.length>0&&t.find(".message-name").length>0&&e.find(".message-name").length>0&&t.find(".message-name").text()!==e.find(".message-name").text()&&(t.addClass("message-last message-with-tail"),e.addClass("message-first"))})},o.scrollMessagesContainer=function(e){if(e=s(e||".messages-content"),0!==e.length){var a=e.find(".messages"),t=a.hasClass("new-messages-first"),n=e[0].scrollTop,r=t?0:e[0].scrollHeight-e[0].offsetHeight;r!==n&&e.scrollTop(r,400)}},o.swipeoutOpenedEl=void 0,o.allowSwipeout=!0,o.initSwipeout=function(e){function a(e){o.allowSwipeout&&(i=!1,r=!0,l=void 0,I.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,I.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,p=(new Date).getTime())}function t(e){if(r){var a="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,t="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY;if("undefined"==typeof l&&(l=!!(l||Math.abs(t-I.y)>Math.abs(a-I.x))),l)return void(r=!1);if(!i){if(s(".list-block.sortable-opened").length>0)return;c=s(this),f=c.find(".swipeout-content"),u=c.find(".swipeout-actions-right"),h=c.find(".swipeout-actions-left"),m=g=C=y=k=T=null,M=h.hasClass("swipeout-actions-no-fold")||o.params.swipeoutActionsNoFold,O=u.hasClass("swipeout-actions-no-fold")||o.params.swipeoutActionsNoFold,h.length>0&&(m=h.outerWidth(),C=h.children("a"),T=h.find(".swipeout-overswipe")),u.length>0&&(g=u.outerWidth(),y=u.children("a"),k=u.find(".swipeout-overswipe")),w=c.hasClass("swipeout-opened"),w&&(b=c.find(".swipeout-actions-left.swipeout-actions-opened").length>0?"left":"right"),c.removeClass("transitioning"),o.params.swipeoutNoFollow||(c.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),c.removeClass("swipeout-opened"))}if(i=!0,e.preventDefault(),d=a-I.x,v=d,w&&("right"===b?v-=g:v+=m),v>0&&0===h.length||0>v&&0===u.length){if(!w)return void(r=i=!1);v=0}x=0>v?"to-left":v>0?"to-right":x?x:"to-left";var n,p,D;if(e.f7PreventPanelSwipe=!0,o.params.swipeoutNoFollow)return w?("right"===b&&d>0&&o.swipeoutClose(c),"left"===b&&0>d&&o.swipeoutClose(c)):(0>d&&u.length>0&&o.swipeoutOpen(c,"right"),d>0&&h.length>0&&o.swipeoutOpen(c,"left")),r=!1,void(i=!1);S=!1,P=!1;var E;if(u.length>0)for(D=v/g,-g>v&&(v=-g-Math.pow(-v-g,.8),k.length>0&&(P=!0)),n=0;n<y.length;n++)"undefined"==typeof y[n]._buttonOffset&&(y[n]._buttonOffset=y[n].offsetLeft),p=y[n]._buttonOffset,E=s(y[n]),k.length>0&&E.hasClass("swipeout-overswipe")&&E.css({left:(P?-p:0)+"px"}),E.transform("translate3d("+(v-p*(1+Math.max(D,-1)))+"px,0,0)");
if(h.length>0)for(D=v/m,v>m&&(v=m+Math.pow(v-m,.8),T.length>0&&(S=!0)),n=0;n<C.length;n++)"undefined"==typeof C[n]._buttonOffset&&(C[n]._buttonOffset=m-C[n].offsetLeft-C[n].offsetWidth),p=C[n]._buttonOffset,E=s(C[n]),T.length>0&&E.hasClass("swipeout-overswipe")&&E.css({left:(S?p:0)+"px"}),C.length>1&&E.css("z-index",C.length-n),E.transform("translate3d("+(v+p*(1-Math.min(D,1)))+"px,0,0)");f.transform("translate3d("+v+"px,0,0)")}}function n(){if(!r||!i)return r=!1,void(i=!1);r=!1,i=!1;var e,a,t,n,l,b,T=(new Date).getTime()-p;if(b="to-left"===x?O:M,t="to-left"===x?u:h,a="to-left"===x?g:m,e=300>T&&(-10>d&&"to-left"===x||d>10&&"to-right"===x)||T>=300&&Math.abs(v)>a/2?"open":"close",300>T&&(0===Math.abs(v)&&(e="close"),Math.abs(v)===a&&(e="open")),"open"===e){o.swipeoutOpenedEl=c,c.trigger("open"),c.addClass("swipeout-opened transitioning");var k="to-left"===x?-a:a;if(f.transform("translate3d("+k+"px,0,0)"),t.addClass("swipeout-actions-opened"),n="to-left"===x?y:C)for(l=0;l<n.length;l++)s(n[l]).transform("translate3d("+k+"px,0,0)");P&&u.find(".swipeout-overswipe")[0].click(),S&&h.find(".swipeout-overswipe")[0].click()}else c.trigger("close"),o.swipeoutOpenedEl=void 0,c.addClass("transitioning").removeClass("swipeout-opened"),f.transform(""),t.removeClass("swipeout-actions-opened");var I;if(C&&C.length>0&&C!==n)for(l=0;l<C.length;l++)I=C[l]._buttonOffset,"undefined"==typeof I&&(C[l]._buttonOffset=m-C[l].offsetLeft-C[l].offsetWidth),s(C[l]).transform("translate3d("+I+"px,0,0)");if(y&&y.length>0&&y!==n)for(l=0;l<y.length;l++)I=y[l]._buttonOffset,"undefined"==typeof I&&(y[l]._buttonOffset=y[l].offsetLeft),s(y[l]).transform("translate3d("+-I+"px,0,0)");f.transitionEnd(function(){w&&"open"===e||closed&&"close"===e||(c.trigger("open"===e?"opened":"closed"),w&&"close"===e&&(u.length>0&&y.transform(""),h.length>0&&C.transform("")))})}var r,i,l,p,d,c,f,u,h,m,g,v,w,b,C,y,x,T,k,S,P,M,O,I={};s(document).on(o.touchEvents.start,function(e){if(o.swipeoutOpenedEl){var a=s(e.target);o.swipeoutOpenedEl.is(a[0])||a.parents(".swipeout").is(o.swipeoutOpenedEl)||a.hasClass("modal-in")||a.parents(".modal.modal-in").length>0||a.hasClass("modal-overlay")||o.swipeoutClose(o.swipeoutOpenedEl)}}),e?(s(e).on(o.touchEvents.start,a),s(e).on(o.touchEvents.move,t),s(e).on(o.touchEvents.end,n)):(s(document).on(o.touchEvents.start,".list-block li.swipeout",a),s(document).on(o.touchEvents.move,".list-block li.swipeout",t),s(document).on(o.touchEvents.end,".list-block li.swipeout",n))},o.swipeoutOpen=function(e,a,t){if(e=s(e),2===arguments.length&&"function"==typeof arguments[1]&&(t=a),0!==e.length&&(e.length>1&&(e=s(e[0])),e.hasClass("swipeout")&&!e.hasClass("swipeout-opened"))){a||(a=e.find(".swipeout-actions-right").length>0?"right":"left");var n=e.find(".swipeout-actions-"+a);if(0!==n.length){{n.hasClass("swipeout-actions-no-fold")||o.params.swipeoutActionsNoFold}e.trigger("open").addClass("swipeout-opened").removeClass("transitioning"),n.addClass("swipeout-actions-opened");var r,i=n.children("a"),l=n.outerWidth(),p="right"===a?-l:l;if(i.length>1){for(r=0;r<i.length;r++)"right"===a?s(i[r]).transform("translate3d("+-i[r].offsetLeft+"px,0,0)"):s(i[r]).css("z-index",i.length-r).transform("translate3d("+(l-i[r].offsetWidth-i[r].offsetLeft)+"px,0,0)");{i[1].clientLeft}}for(e.addClass("transitioning"),r=0;r<i.length;r++)s(i[r]).transform("translate3d("+p+"px,0,0)");e.find(".swipeout-content").transform("translate3d("+p+"px,0,0)").transitionEnd(function(){e.trigger("opened"),t&&t.call(e[0])}),o.swipeoutOpenedEl=e}}},o.swipeoutClose=function(e,a){if(e=s(e),0!==e.length&&e.hasClass("swipeout-opened")){var t=e.find(".swipeout-actions-opened").hasClass("swipeout-actions-right")?"right":"left",n=e.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),r=(n.hasClass("swipeout-actions-no-fold")||o.params.swipeoutActionsNoFold,n.children("a")),i=n.outerWidth();o.allowSwipeout=!1,e.trigger("close"),e.removeClass("swipeout-opened").addClass("transitioning"),e.find(".swipeout-content").transform("translate3d(0px,0,0)").transitionEnd(function(){o.allowSwipeout=!0,r.transform(""),e.trigger("closed"),a&&a.call(e[0])});for(var l=0;l<r.length;l++)s(r[l]).transform("right"===t?"translate3d("+-r[l].offsetLeft+"px,0,0)":"translate3d("+(i-r[l].offsetWidth-r[l].offsetLeft)+"px,0,0)"),s(r[l]).css({left:"0px"});o.swipeoutOpenedEl&&o.swipeoutOpenedEl[0]===e[0]&&(o.swipeoutOpenedEl=void 0)}},o.swipeoutDelete=function(e,a){if(e=s(e),0!==e.length){e.length>1&&(e=s(e[0])),o.swipeoutOpenedEl=void 0,e.trigger("delete"),e.css({height:e.outerHeight()+"px"});{e[0].clientLeft}e.css({height:"0px"}).addClass("deleting transitioning").transitionEnd(function(){if(e.trigger("deleted"),a&&a.call(e[0]),e.parents(".virtual-list").length>0){var t=e.parents(".virtual-list")[0].f7VirtualList,n=e[0].f7VirtualListIndex;t&&"undefined"!=typeof n&&t.deleteItem(n)}else e.remove()});var t="-100%";e.find(".swipeout-content").transform("translate3d("+t+",0,0)")}},o.sortableToggle=function(e){return e=s(e),0===e.length&&(e=s(".list-block.sortable")),e.toggleClass("sortable-opened"),e.trigger(e.hasClass("sortable-opened")?"open":"close"),e},o.sortableOpen=function(e){return e=s(e),0===e.length&&(e=s(".list-block.sortable")),e.addClass("sortable-opened"),e.trigger("open"),e},o.sortableClose=function(e){return e=s(e),0===e.length&&(e=s(".list-block.sortable")),e.removeClass("sortable-opened"),e.trigger("close"),e},o.initSortable=function(){function e(e){r=!1,n=!0,i="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,p=s(this).parent(),c=p.parent().find("li"),g=p.parents(".sortable"),e.preventDefault(),o.allowPanelOpen=o.allowSwipeout=!1}function a(e){if(n&&p){var a=("touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY);r||(p.addClass("sorting"),g.addClass("sortable-sorting"),f=p[0].offsetTop,u=p.parent().height()-p[0].offsetTop-p.height(),d=p[0].offsetHeight),r=!0,e.preventDefault(),e.f7PreventPanelSwipe=!0,l=a-i;var t=l;-f>t&&(t=-f),t>u&&(t=u),p.transform("translate3d(0,"+t+"px,0)"),m=h=void 0,c.each(function(){var e=s(this);if(e[0]!==p[0]){var a=e[0].offsetTop,n=e.height(),r=p[0].offsetTop+t;r>=a-n/2&&p.index()<e.index()?(e.transform("translate3d(0, "+-d+"px,0)"),h=e,m=void 0):a+n/2>=r&&p.index()>e.index()?(e.transform("translate3d(0, "+d+"px,0)"),h=void 0,m||(m=e)):s(this).transform("translate3d(0, 0%,0)")}})}}function t(e){if(o.allowPanelOpen=o.allowSwipeout=!0,!n||!r)return n=!1,void(r=!1);e.preventDefault(),c.transform(""),p.removeClass("sorting"),g.removeClass("sortable-sorting");var a,t,i;h&&(p.insertAfter(h),p.trigger("sort")),m&&(p.insertBefore(m),p.trigger("sort")),(h||m)&&g.hasClass("virtual-list")&&(a=g[0].f7VirtualList,t=p[0].f7VirtualListIndex,i=m?m[0].f7VirtualListIndex:h[0].f7VirtualListIndex,a&&a.moveItem(t,i)),h=m=void 0,n=!1,r=!1}var n,r,i,l,p,d,c,f,u,h,m,g;s(document).on(o.touchEvents.start,".list-block.sortable .sortable-handler",e),o.support.touch?(s(document).on(o.touchEvents.move,".list-block.sortable .sortable-handler",a),s(document).on(o.touchEvents.end,".list-block.sortable .sortable-handler",t)):(s(document).on(o.touchEvents.move,a),s(document).on(o.touchEvents.end,t))},o.initSmartSelects=function(e){var a=s(e);if(0!==a.length){var t=a.find(".smart-select");0!==t.length&&t.each(function(){var e=s(this),a=e.find("select");if(0!==a.length){var t=a[0];if(0!==t.length){for(var n=[],r=0;r<t.length;r++)t[r].selected&&n.push(t[r].textContent.trim());var o=e.find(".item-after");if(0===o.length)e.find(".item-inner").append('<div class="item-after">'+n.join(", ")+"</div>");else{var i=o.text();if(o.hasClass("smart-select-value"))for(r=0;r<t.length;r++)t[r].selected=t[r].textContent.trim()===i.trim();else o.text(n.join(", "))}}}})}},o.smartSelectOpen=function(e){function a(a){if(h){var t=o.virtualList(s(a).find(".virtual-list"),{items:P,template:E,height:m||void 0,searchByItem:function(e,a,t){return t.text.toLowerCase().indexOf(e.trim())>=0?!0:!1}});s(a).once("popup"===r?"closed":"pageBeforeRemove",function(){t&&t.destroy&&t.destroy()})}s(a).on("change",'input[name="'+I+'"]',function(){var a=this,t=a.value,i=[];if("checkbox"===a.type)for(var s=0;s<g.options.length;s++){var l=g.options[s];l.value===t&&(l.selected=a.checked),l.selected&&i.push(l.textContent.trim())}else i=[e.find('option[value="'+t+'"]').text()],g.value=t;v.trigger("change"),e.find(".item-after").text(i.join(", ")),c&&"radio"===O&&("popup"===r?o.closeModal(G):n.router.back())})}function t(e){var n=e.detail.page;n.name===q&&(s(document).off("pageInit",t),a(n.container))}if(e=s(e),0!==e.length){var n=e.parents("."+o.params.viewClass);if(0!==n.length&&(n=n[0].f7View)){var r=e.attr("data-open-in");r||(r=o.params.smartSelectInPopup?"popup":"page");var i=e.attr("data-page-title")||e.find(".item-title").text(),p=e.attr("data-back-text")||o.params.smartSelectBackText,d=e.attr("data-popup-close-text")||e.attr("data-back-text")||o.params.smartSelectPopupCloseText,c=e.attr("data-back-onselect")?"true"===e.attr("data-back-onselect")?!0:!1:o.params.smartSelectBackOnSelect,f=e.attr("data-form-theme")||o.params.smartSelectFormTheme,u=e.attr("data-navbar-theme")||o.params.smartSelectNavbarTheme,h="true"===e.attr("data-virtual-list"),m=e.attr("data-virtual-list-height"),g=e.find("select")[0],v=s(g);if(!(g.disabled||e.hasClass("disabled")||v.hasClass("disabled"))){for(var w,b,C,y,x,T,k,S,P=[],M=(new Date).getTime(),O=g.multiple?"checkbox":"radio",I=O+"-"+M,D=0;D<g.length;D++)w=s(g[D]),w[0].disabled||(C=w.attr("data-option-image")||v.attr("data-option-image"),y=w.attr("data-option-icon")||v.attr("data-option-icon"),b=C||y||"checkbox"===O,x=w.parent("optgroup")[0],T=x&&x.label,k=!1,x&&x!==S&&(k=!0,S=x),P.push({value:w[0].value,text:w[0].textContent.trim(),selected:w[0].selected,group:x,groupLabel:T,showGroupLabel:k,image:C,icon:y,disabled:w[0].disabled,inputType:O,id:M,hasMedia:b,checkbox:"checkbox"===O,inputName:I,test:this}));o._compiledTemplates.smartSelectItem||(o._compiledTemplates.smartSelectItem=l.compile(o.params.smartSelectItemTemplate||'{{#if showGroupLabel}}<li class="item-divider">{{groupLabel}}</li>{{/if}}<li><label class="label-{{inputType}} item-content"><input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>{{#if hasMedia}}<div class="item-media">{{#if checkbox}}<i class="icon icon-form-checkbox"></i>{{/if}}{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}{{#if image}}<img src="{{image}}">{{/if}}</div>{{/if}}<div class="item-inner"><div class="item-title">{{text}}</div></div></label></li>'));var E=o._compiledTemplates.smartSelectItem,L="";if(!h)for(var N=0;N<P.length;N++)L+=E(P[N]);o._compiledTemplates.smartSelectNavbar||(o._compiledTemplates.smartSelectNavbar=l.compile(o.params.smartSelectNavbarTemplate||'<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}"><div class="navbar-inner">{{leftTemplate}}<div class="center sliding">{{pageTitle}}</div></div></div>'));var B,A=o._compiledTemplates.smartSelectNavbar({pageTitle:i,backText:p,closeText:d,openIn:r,navbarTheme:u,inPopup:"popup"===r,inPage:"page"===r,leftTemplate:"popup"===r?o.params.smartSelectPopupCloseTemplate.replace(/{{closeText}}/g,d):o.params.smartSelectBackTemplate.replace(/{{backText}}/g,p)}),z="",H="";"page"===r?(B="static",e.parents(".navbar-through").length>0&&(B="through"),e.parents(".navbar-fixed").length>0&&(B="fixed"),H=e.parents(".page").hasClass("no-toolbar")?"no-toolbar":"",z=e.parents(".page").hasClass("no-navbar")?"no-navbar":"navbar-"+B):B="fixed";var R,V,q="smart-select-"+I,Y="undefined"==typeof e.data("searchbar")?o.params.smartSelectSearchbar:"true"===e.data("searchbar")?!0:!1;Y&&(R=e.data("searchbar-placeholder")||"Search",V=e.data("searchbar-cancel")||"Cancel");var G,F='<form class="searchbar" data-search-list=".smart-select-list-'+M+'" data-search-in=".item-title"><div class="searchbar-input"><input type="search" placeholder="'+R+'"><a href="#" class="searchbar-clear"></a></div><a href="#" class="searchbar-cancel">'+V+'</a></form><div class="searchbar-overlay"></div>',W=("through"===B?A:"")+'<div class="pages">  <div data-page="'+q+'" class="page smart-select-page '+z+" "+H+'">'+("fixed"===B?A:"")+(Y?F:"")+'    <div class="page-content">'+("static"===B?A:"")+'      <div class="list-block '+(h?"virtual-list":"")+" smart-select-list-"+M+" "+(f?"theme-"+f:"")+'">        <ul>'+(h?"":L)+"        </ul>      </div>    </div>  </div></div>";"popup"===r?(G=o.popup('<div class="popup smart-select-popup smart-select-popup-'+I+'"><div class="view navbar-fixed">'+W+"</div></div>"),o.initPage(s(G).find(".page")),a(G)):(s(document).on("pageInit",t),n.router.load({content:W}))}}}};var u=function(e,a){var t={cols:1,height:44,cache:!0,dynamicHeightBufferSize:1};a=a||{};for(var n in t)"undefined"==typeof a[n]&&(a[n]=t[n]);var r=this;r.listBlock=s(e),r.params=a,r.items=a.items,a.template&&("string"==typeof a.template?r.template=l.compile(a.template):"function"==typeof a.template&&(r.template=a.template)),r.pageContent=r.listBlock.parents(".page-content");var i;"undefined"!=typeof r.params.updatableScroll?i=r.params.updatableScroll:(i=!0,o.device.ios&&o.device.osVersion.split(".")[0]<8&&(i=!1)),r.ul=r.params.ul?s(r.params.ul):r.listBlock.children("ul"),0===r.ul.length&&(r.listBlock.append("<ul></ul>"),r.ul=r.listBlock.children("ul")),r.domCache={},r.displayDomCache={},r.tempDomElement=document.createElement("ul"),r.lastRepaintY=null,r.fragment=document.createDocumentFragment(),r.filterItems=function(e,a){r.filteredItems=[];for(var t=(e[0],e[e.length-1],0);t<e.length;t++)r.filteredItems.push(r.items[e[t]]);"undefined"==typeof a&&(a=!0),a&&(r.pageContent[0].scrollTop=0),r.update()},r.resetFilter=function(){r.filteredItems=null,delete r.filteredItems,r.update()};var p,d,c,f,u,h,m=0,g="function"==typeof r.params.height;return r.setListSize=function(){var e=r.filteredItems||r.items;if(p=r.pageContent[0].offsetHeight,g){h=0,r.heights=[];for(var a=0;a<e.length;a++){var t=r.params.height(e[a]);h+=t,r.heights.push(t)}}else h=e.length*r.params.height/r.params.cols,d=Math.ceil(p/r.params.height),c=r.params.rowsBefore||2*d,f=r.params.rowsAfter||d,u=d+c+f,m=c/2*r.params.height;i&&r.ul.css({height:h+"px"})},r.render=function(e,a){e&&(r.lastRepaintY=null);var t=-(r.listBlock[0].getBoundingClientRect().top+r.pageContent[0].getBoundingClientRect().top);if("undefined"!=typeof a&&(t=a),null===r.lastRepaintY||Math.abs(t-r.lastRepaintY)>m||!i&&r.pageContent[0].scrollTop+p>=r.pageContent[0].scrollHeight){r.lastRepaintY=t;var n,o,s=r.filteredItems||r.items,l=0,d=0;if(g){var f,h,v=0;for(m=p,f=0;f<r.heights.length;f++)h=r.heights[f],"undefined"==typeof n&&(v+h>=t-2*p*r.params.dynamicHeightBufferSize?n=f:l+=h),"undefined"==typeof o&&((v+h>=t+2*p*r.params.dynamicHeightBufferSize||f===r.heights.length-1)&&(o=f+1),d+=h),v+=h;o=Math.min(o,s.length)}else n=(parseInt(t/r.params.height)-c)*r.params.cols,0>n&&(n=0),o=Math.min(n+u*r.params.cols,s.length);var w;r.reachEnd=!1;for(var b=n;o>b;b++){var C,y;y=r.items.indexOf(s[b]),b===n&&(r.currentFromIndex=y),b===o-1&&(r.currentToIndex=y),y===r.items.length-1&&(r.reachEnd=!0),r.domCache[y]?C=r.domCache[y]:(r.tempDomElement.innerHTML=r.template?r.template(s[b],{index:y}):r.params.renderItem?r.params.renderItem(y,s[b]):s[b],C=r.tempDomElement.childNodes[0],r.params.cache&&(r.domCache[y]=C)),C.f7VirtualListIndex=y,b===n&&(w=g?l:b*r.params.height/r.params.cols),C.style.top=w+"px",r.params.onItemBeforeInsert&&r.params.onItemBeforeInsert(r,C),r.fragment.appendChild(C)}i||(r.ul[0].style.height=g?d+"px":b*r.params.height/r.params.cols+"px"),r.params.onBeforeClear&&r.params.onBeforeClear(r,r.fragment),r.ul[0].innerHTML="",r.params.onItemsBeforeInsert&&r.params.onItemsBeforeInsert(r,r.fragment),r.ul[0].appendChild(r.fragment),r.params.onItemsAfterInsert&&r.params.onFragmentAfterInsert(r,r.fragment),"undefined"!=typeof a&&e&&r.pageContent.scrollTop(a,0)}},r.scrollToItem=function(e){if(e>r.items.length)return!1;var a,t=0;if(g)for(var n=0;e>n;n++)t+=r.heights[n];else t=e*r.params.height;return a=r.listBlock[0].offsetTop,r.render(!0,a+t-parseInt(r.pageContent.css("padding-top"),10)),!0},r.handleScroll=function(){r.render()},r.handleResize=function(){r.setListSize(),r.render(!0)},r.attachEvents=function(e){var a=e?"off":"on";r.pageContent[a]("scroll",r.handleScroll),s(window)[a]("resize",r.handleResize)},r.init=function(){r.attachEvents(),r.setListSize(),r.render()},r.appendItems=function(e){for(var a=0;a<e.length;a++)r.items.push(e[a]);r.update()},r.appendItem=function(e){r.appendItems([e])},r.replaceAllItems=function(e){r.items=e,delete r.filteredItems,r.domCache={},r.update()},r.replaceItem=function(e,a){r.items[e]=a,r.params.cache&&delete r.domCache[e],r.update()},r.prependItems=function(e){for(var a=e.length-1;a>=0;a--)r.items.unshift(e[a]);if(r.params.cache){var t={};for(var n in r.domCache)t[parseInt(n,10)+e.length]=r.domCache[n];r.domCache=t}r.update()},r.prependItem=function(e){r.prependItems([e])},r.moveItem=function(e,a){if(e!==a){var t=r.items.splice(e,1)[0];if(a>=r.items.length?(r.items.push(t),a=r.items.length-1):r.items.splice(a,0,t),r.params.cache){var n={};for(var o in r.domCache){var i=parseInt(o,10),s=a>e?e:a,l=a>e?a:e,p=a>e?-1:1;(s>i||i>l)&&(n[i]=r.domCache[i]),i===s&&(n[l]=r.domCache[i]),i>s&&l>=i&&(n[i+p]=r.domCache[i])}r.domCache=n}r.update()}},r.insertItemBefore=function(e,a){if(0===e)return void r.prependItem(a);if(e>=r.items.length)return void r.appendItem(a);if(r.items.splice(e,0,a),r.params.cache){var t={};for(var n in r.domCache){var o=parseInt(n,10);o>=e&&(t[o+1]=r.domCache[o])}r.domCache=t}r.update()},r.deleteItems=function(e){for(var a,t=0,n=0;n<e.length;n++){var o=e[n];"undefined"!=typeof a&&o>a&&(t=-n),o+=t,a=e[n];var i=r.items.splice(o,1)[0];if(r.filteredItems&&r.filteredItems.indexOf(i)>=0&&r.filteredItems.splice(r.filteredItems.indexOf(i),1),r.params.cache){var s={};for(var l in r.domCache){var p=parseInt(l,10);p===o?delete r.domCache[o]:parseInt(l,10)>o?s[p-1]=r.domCache[l]:s[p]=r.domCache[l]}r.domCache=s}}r.update()},r.deleteAllItems=function(){r.items=[],delete r.filteredItems,r.params.cache&&(r.domCache={}),r.update()},r.deleteItem=function(e){r.deleteItems([e])},r.clearCache=function(){r.domCache={}},r.update=function(){r.setListSize(),r.render(!0)},r.destroy=function(){r.attachEvents(!0),delete r.items,delete r.domCache},r.init(),r.listBlock[0].f7VirtualList=r,r};o.virtualList=function(e,a){return new u(e,a)},o.reinitVirtualList=function(e){var a=s(e),t=a.find(".virtual-list");if(0!==t.length)for(var n=0;n<t.length;n++){var r=r[0].f7VirtualList;r&&r.update()}},o.initPullToRefresh=function(e){function a(e){if(p){if("android"!==o.device.os)return;if("targetTouches"in e&&e.targetTouches.length>1)return}d=!1,p=!0,c=void 0,v=void 0,C.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,C.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,u=(new Date).getTime(),h=s(this)}function t(e){if(p){var a="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,t="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY;if("undefined"==typeof c&&(c=!!(c||Math.abs(t-C.y)>Math.abs(a-C.x))),!c)return void(p=!1);if(g=h[0].scrollTop,"undefined"==typeof v&&0!==g&&(v=!0),!d){if(h.removeClass("transitioning"),g>h[0].offsetHeight)return void(p=!1);b&&(w=h.attr("data-ptr-distance"),w.indexOf("%")>=0&&(w=h[0].offsetHeight*parseInt(w,10)/100)),T=h.hasClass("refreshing")?w:0,x=h[0].scrollHeight===h[0].offsetHeight||"ios"!==o.device.os?!0:!1}return d=!0,f=t-C.y,f>0&&0>=g||0>g?("ios"===o.device.os&&parseInt(o.device.osVersion.split(".")[0],10)>7&&0===g&&!v&&(x=!0),x&&(e.preventDefault(),m=Math.pow(f,.85)+T,h.transform("translate3d(0,"+m+"px,0)")),x&&Math.pow(f,.85)>w||!x&&f>=2*w?(y=!0,h.addClass("pull-up").removeClass("pull-down")):(y=!1,h.removeClass("pull-up").addClass("pull-down")),void 0):(h.removeClass("pull-up pull-down"),void(y=!1))}}function n(){return p&&d?(m&&(h.addClass("transitioning"),m=0),h.transform(""),y?(h.addClass("refreshing"),h.trigger("refresh",{done:function(){o.pullToRefreshDone(h)}})):h.removeClass("pull-down"),p=!1,void(d=!1)):(p=!1,void(d=!1))}function r(){l.off(o.touchEvents.start,a),l.off(o.touchEvents.move,t),l.off(o.touchEvents.end,n)}function i(){r(),k.off("pageBeforeRemove",i)}var l=s(e);if(l.hasClass("pull-to-refresh-content")||(l=l.find(".pull-to-refresh-content")),l&&0!==l.length){var p,d,c,f,u,h,m,g,v,w,b,C={},y=!1,x=!1,T=0,k=l.hasClass("page")?l:l.parents(".page"),S=!1;(k.find(".navbar").length>0||k.parents(".navbar-fixed, .navbar-through").length>0||k.hasClass("navbar-fixed")||k.hasClass("navbar-through"))&&(S=!0),k.hasClass("no-navbar")&&(S=!1),S||l.addClass("pull-to-refresh-no-navbar"),h=l,h.attr("data-ptr-distance")?b=!0:w=44,l.on(o.touchEvents.start,a),l.on(o.touchEvents.move,t),l.on(o.touchEvents.end,n),0!==k.length&&(l[0].f7DestroyPullToRefresh=r,k.on("pageBeforeRemove",i))}},o.pullToRefreshDone=function(e){e=s(e),0===e.length&&(e=s(".pull-to-refresh-content.refreshing")),e.removeClass("refreshing").addClass("transitioning"),e.transitionEnd(function(){e.removeClass("transitioning pull-up pull-down")})},o.pullToRefreshTrigger=function(e){e=s(e),0===e.length&&(e=s(".pull-to-refresh-content")),e.hasClass("refreshing")||(e.addClass("transitioning refreshing"),e.trigger("refresh",{done:function(){o.pullToRefreshDone(e)}}))},o.destroyPullToRefresh=function(e){e=s(e);var a=e.hasClass("pull-to-refresh-content")?e:e.find(".pull-to-refresh-content");0!==a.length&&a[0].f7DestroyPullToRefresh&&a[0].f7DestroyPullToRefresh()},o.attachInfiniteScroll=function(e){s(e).on("scroll",n)},o.detachInfiniteScroll=function(e){s(e).off("scroll",n)},o.initInfiniteScroll=function(e){function a(){o.detachInfiniteScroll(t),e.off("pageBeforeRemove",a)}e=s(e);var t=e.find(".infinite-scroll");0!==t.length&&(o.attachInfiniteScroll(t),e.on("pageBeforeRemove",a))},o.initScrollToolbars=function(e){function a(){e.hasClass("page-on-left")||(u=t[0].scrollTop,v=t[0].scrollHeight,w=t[0].offsetHeight,b=o.params.showBarsOnPageScrollEnd&&u+w>=v-P,y=d.hasClass("navbar-hidden"),x=c.hasClass("toolbar-hidden"),T=p&&p.hasClass("toolbar-hidden"),C=f>u||b?"show":u>44?"hide":"show","show"===C?(h&&n&&y&&(o.showNavbar(d),e.removeClass("no-navbar-by-scroll"),y=!1),m&&r&&x&&(o.showToolbar(c),e.removeClass("no-toolbar-by-scroll"),x=!1),g&&i&&T&&(o.showToolbar(p),e.removeClass("no-tabbar-by-scroll"),T=!1)):(h&&n&&!y&&(o.hideNavbar(d),e.addClass("no-navbar-by-scroll"),y=!0),m&&r&&!x&&(o.hideToolbar(c),e.addClass("no-toolbar-by-scroll"),x=!0),g&&i&&!T&&(o.hideToolbar(p),e.addClass("no-tabbar-by-scroll"),T=!0)),f=u)}e=s(e);var t=e.find(".page-content");if(0!==t.length){var n=(o.params.hideNavbarOnPageScroll||t.hasClass("hide-navbar-on-scroll")||t.hasClass("hide-bars-on-scroll"))&&!(t.hasClass("keep-navbar-on-scroll")||t.hasClass("keep-bars-on-scroll")),r=(o.params.hideToolbarOnPageScroll||t.hasClass("hide-toolbar-on-scroll")||t.hasClass("hide-bars-on-scroll"))&&!(t.hasClass("keep-toolbar-on-scroll")||t.hasClass("keep-bars-on-scroll")),i=(o.params.hideTabbarOnPageScroll||t.hasClass("hide-tabbar-on-scroll"))&&!t.hasClass("keep-tabbar-on-scroll");if(n||r||i){var l=t.parents("."+o.params.viewClass);if(0!==l.length){var p,d=l.find(".navbar"),c=l.find(".toolbar");i&&(p=l.find(".tabbar"),0===p.length&&(p=l.parents("."+o.params.viewsClass).find(".tabbar")));var f,u,h=d.length>0,m=c.length>0,g=p&&p.length>0;f=u=t[0].scrollTop;var v,w,b,C,y,x,T,k=m&&r?c[0].offsetHeight:0,S=g&&i?p[0].offsetHeight:0,P=S||k;t.on("scroll",a),t[0].f7ScrollToolbarsHandler=a}}}},o.destroyScrollToolbars=function(e){e=s(e);var a=e.find(".page-content");if(0!==a.length){var t=a[0].f7ScrollToolbarsHandler;t&&a.off("scroll",a[0].f7ScrollToolbarsHandler)}},o.showTab=function(e,a,t){var n=s(e);if(2===arguments.length&&"boolean"==typeof a&&(t=a),0===n.length)return!1;if(n.hasClass("active"))return t&&n.trigger("show"),!1;var r=n.parent(".tabs");if(0===r.length)return!1;o.allowSwipeout=!0;var i=r.parent().hasClass("tabs-animated-wrap");i&&r.transform("translate3d("+100*-n.index()+"%,0,0)");var l=r.children(".tab.active").removeClass("active");if(n.addClass("active"),n.trigger("show"),!i&&n.find(".navbar").length>0){var p;p=n.hasClass(o.params.viewClass)?n[0]:n.parents("."+o.params.viewClass)[0],o.sizeNavbars(p)}if(a?a=s(a):(a=s("string"==typeof e?'.tab-link[href="'+e+'"]':'.tab-link[href="#'+n.attr("id")+'"]'),(!a||a&&0===a.length)&&s("[data-tab]").each(function(){n.is(s(this).attr("data-tab"))&&(a=s(this))})),0!==a.length){var d;if(l&&l.length>0){var c=l.attr("id");c&&(d=s('.tab-link[href="#'+c+'"]')),(!d||d&&0===d.length)&&s("[data-tab]").each(function(){l.is(s(this).attr("data-tab"))&&(d=s(this))})}return a&&a.length>0&&a.addClass("active"),d&&d.length>0&&d.removeClass("active"),!0}},o.accordionToggle=function(e){e=s(e),0!==e.length&&(e.hasClass("accordion-item-expanded")?o.accordionClose(e):o.accordionOpen(e))},o.accordionOpen=function(e){e=s(e);var a=e.parents(".accordion-list").eq(0),t=e.children(".accordion-item-content");0===t.length&&(t=e.find(".accordion-item-content"));var n=a.length>0&&e.parent().children(".accordion-item-expanded");n.length>0&&o.accordionClose(n),t.css("height",t[0].scrollHeight+"px").transitionEnd(function(){if(e.hasClass("accordion-item-expanded")){t.transition(0),t.css("height","auto");{t[0].clientLeft}t.transition(""),e.trigger("opened")}else t.css("height",""),e.trigger("closed")}),e.trigger("open"),e.addClass("accordion-item-expanded")},o.accordionClose=function(e){e=s(e);var a=e.children(".accordion-item-content");0===a.length&&(a=e.find(".accordion-item-content")),e.removeClass("accordion-item-expanded"),a.transition(0),a.css("height",a[0].scrollHeight+"px");a[0].clientLeft;a.transition(""),a.css("height","").transitionEnd(function(){if(e.hasClass("accordion-item-expanded")){a.transition(0),a.css("height","auto");{a[0].clientLeft}a.transition(""),e.trigger("opened")}else a.css("height",""),e.trigger("closed")}),e.trigger("close")},o.initFastClicks=function(){function e(e){var a,t=s(e.target),n=t.parents(o.params.activeStateElements);return t.is(o.params.activeStateElements)&&(a=t),n.length>0&&(a=a?a.add(n):n),a?a:t}function a(){var e=M.parents(".page-content, .panel");return 0===e.length?!1:("yes"!==e.prop("scrollHandlerSet")&&(e.on("scroll",function(){clearTimeout(O)}),e.prop("scrollHandlerSet","yes")),!0)}function t(){M.addClass("active-state")}function n(){M.removeClass("active-state")}function r(e){var a="button checkbox file image radio submit input textarea".split(" ");return document.activeElement&&e!==document.activeElement&&document.activeElement!==document.body?a.indexOf(e.nodeName.toLowerCase())>=0?!1:!0:!1}function i(e){var a=s(e);return"input"===e.nodeName.toLowerCase()&&"file"===e.type?!1:a.hasClass("no-fastclick")||a.parents(".no-fastclick").length>0?!1:!0}function l(e){if(document.activeElement===e)return!1;var a=e.nodeName.toLowerCase(),t="button checkbox file image radio submit".split(" ");return e.disabled||e.readOnly?!1:"textarea"===a?!0:"select"===a?o.device.android?!1:!0:"input"===a&&t.indexOf(e.type)<0?!0:void 0}function p(e){e=s(e);var a=!0;return(e.is("label")||e.parents("label").length>0)&&(a=o.device.android?!1:o.device.ios&&e.is("input")?!0:!1),a}function d(a){e(a).addClass("active-state"),"which"in a&&3===a.which&&setTimeout(function(){s(".active-state").removeClass("active-state")},0)}function c(){s(".active-state").removeClass("active-state")}function f(){s(".active-state").removeClass("active-state")}function u(n){if(P=!1,n.targetTouches.length>1)return!0;if(I=i(n.target),!I)return x=!1,!0;if(o.device.ios){var l=window.getSelection();if(l.rangeCount&&l.focusNode!==document.body&&(!l.isCollapsed||document.activeElement===l.focusNode))return T=!0,!0;T=!1}o.device.android&&r(n.target)&&document.activeElement.blur(),x=!0,y=n.target,C=(new Date).getTime(),w=n.targetTouches[0].pageX,b=n.targetTouches[0].pageY,o.device.ios&&(k=void 0,s(y).parents().each(function(){var e=this;e.scrollHeight>e.offsetHeight&&!k&&(k=e,k.f7ScrollTop=k.scrollTop)})),n.timeStamp-S<o.params.fastClicksDelayBetweenClicks&&n.preventDefault(),o.params.activeState&&(M=e(n),a(n)?O=setTimeout(t,80):t())}function h(e){if(x){var a=!1,t=o.params.fastClicksDistanceThreshold;if(t){var r=e.targetTouches[0].pageX,i=e.targetTouches[0].pageY;(Math.abs(r-w)>t||Math.abs(i-b)>t)&&(a=!0)}else a=!0;a&&(x=!1,y=null,P=!0),o.params.activeState&&(clearTimeout(O),n())}}function m(e){if(clearTimeout(O),!x)return!T&&I&&(!o.device.android||e.cancelable)&&e.preventDefault(),!0;if(document.activeElement===e.target)return!0;if(T||e.preventDefault(),e.timeStamp-S<o.params.fastClicksDelayBetweenClicks)return setTimeout(n,0),!0;if(S=e.timeStamp,x=!1,o.device.ios&&k&&k.scrollTop!==k.f7ScrollTop)return!1;o.params.activeState&&(t(),setTimeout(n,0)),l(y)&&y.focus(),document.activeElement&&y!==document.activeElement&&document.activeElement!==document.body&&"label"!==y.nodeName.toLowerCase()&&document.activeElement.blur(),e.preventDefault();var a=e.changedTouches[0],r=document.createEvent("MouseEvents"),i="click";return o.device.android&&"select"===y.nodeName.toLowerCase()&&(i="mousedown"),r.initMouseEvent(i,!0,!0,window,1,a.screenX,a.screenY,a.clientX,a.clientY,!1,!1,!1,!1,0,null),r.forwardedTouchEvent=!0,y.dispatchEvent(r),!1}function g(){x=!1,y=null}function v(e){var a=!1;return x?(y=null,x=!1,!0):"submit"===e.target.type&&0===e.detail?!0:(I||(a=!0),document.activeElement===y&&(a=!0),e.forwardedTouchEvent&&(a=!0),e.cancelable||(a=!0),a||(e.stopImmediatePropagation(),e.stopPropagation(),y?(p(y)||P)&&e.preventDefault():e.preventDefault(),y=null),a)}o.params.activeState&&s("html").addClass("watch-active-state");var w,b,C,y,x,T,k,S,P,M,O,I;o.support.touch?(document.addEventListener("click",v,!0),document.addEventListener("touchstart",u),document.addEventListener("touchmove",h),document.addEventListener("touchend",m),document.addEventListener("touchcancel",g)):o.params.activeState&&(document.addEventListener("mousedown",d),document.addEventListener("mousemove",c),document.addEventListener("mouseup",f))},o.initClickEvents=function(){function e(e){var a=s(this),t=s(e.target),n="a"===a[0].nodeName.toLowerCase()||a.parents("a").length>0||"a"===t[0].nodeName.toLowerCase()||t.parents("a").length>0;if(!n){var r;if(o.params.scrollTopOnNavbarClick&&a.is(".navbar .center")){var i=a.parents(".navbar");r=i.parents(".page-content"),0===r.length&&(i.parents(".page").length>0&&(r=i.parents(".page").find(".page-content")),0===r.length&&i.nextAll(".pages").length>0&&(r=i.nextAll(".pages").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content")))}o.params.scrollTopOnStatusbarClick&&a.is(".statusbar-overlay")&&(r=s(".popup.modal-in").length>0?s(".popup.modal-in").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content"):s(".panel.active").length>0?s(".panel.active").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content"):s(".views > .view.active").length>0?s(".views > .view.active").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content"):s(".views").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content")),r&&r.length>0&&(r.hasClass("tab")&&(r=r.parent(".tabs").children(".page-content.active")),r.length>0&&r.scrollTop(0,300))}}function a(e){function a(e){return"false"===e?!1:"true"===e?!0:void 0}var t=s(this),n=t.attr("href"),r="a"===t[0].nodeName.toLowerCase();if(r&&t.is(o.params.externalLinks))return void("_system"===t.attr("target")&&(e.preventDefault(),window.open(n,"_system")));if(t.hasClass("smart-select")&&o.smartSelectOpen&&o.smartSelectOpen(t),t.hasClass("open-panel")&&o.openPanel(1===s(".panel").length?s(".panel").hasClass("panel-left")?"left":"right":"right"===t.attr("data-panel")?"right":"left"),t.hasClass("close-panel")&&o.closePanel(),t.hasClass("panel-overlay")&&o.params.panelsCloseByOutside&&o.closePanel(),t.hasClass("open-popover")){var i;
i=t.attr("data-popover")?t.attr("data-popover"):".popover",o.popover(i,t)}t.hasClass("close-popover")&&o.closeModal(".popover.modal-in");var d;t.hasClass("open-popup")&&(d=t.attr("data-popup")?t.attr("data-popup"):".popup",o.popup(d)),t.hasClass("close-popup")&&(d=t.attr("data-popup")?t.attr("data-popup"):".popup.modal-in",o.closeModal(d));var c;if(t.hasClass("open-login-screen")&&(c=t.attr("data-login-screen")?t.attr("data-login-screen"):".login-screen",o.loginScreen(c)),t.hasClass("close-login-screen")&&o.closeModal(".login-screen.modal-in"),t.hasClass("modal-overlay")&&(s(".modal.modal-in").length>0&&o.params.modalCloseByOutside&&o.closeModal(".modal.modal-in"),s(".actions-modal.modal-in").length>0&&o.params.actionsCloseByOutside&&o.closeModal(".actions-modal.modal-in"),s(".popover.modal-in").length>0&&o.closeModal(".popover.modal-in")),t.hasClass("popup-overlay")&&s(".popup.modal-in").length>0&&o.params.popupCloseByOutside&&o.closeModal(".popup.modal-in"),t.hasClass("close-picker")){var f=s(".picker-modal.modal-in");f.length>0?o.closeModal(f):(f=s(".popover.modal-in .picker-modal"),f.length>0&&o.closeModal(f.parents(".popover")))}if(t.hasClass("open-picker")){var u;u=t.attr("data-picker")?t.attr("data-picker"):".picker-modal",o.pickerModal(u,t)}var h;if(t.hasClass("tab-link")&&(h=!0,o.showTab(t.attr("data-tab")||t.attr("href"),t)),t.hasClass("swipeout-close")&&o.swipeoutClose(t.parents(".swipeout-opened")),t.hasClass("swipeout-delete"))if(t.attr("data-confirm")){var m=t.attr("data-confirm"),g=t.attr("data-confirm-title");g?o.confirm(m,g,function(){o.swipeoutDelete(t.parents(".swipeout"))}):o.confirm(m,function(){o.swipeoutDelete(t.parents(".swipeout"))})}else o.swipeoutDelete(t.parents(".swipeout"));if(t.hasClass("toggle-sortable")&&o.sortableToggle(t.data("sortable")),t.hasClass("open-sortable")&&o.sortableOpen(t.data("sortable")),t.hasClass("close-sortable")&&o.sortableClose(t.data("sortable")),t.hasClass("accordion-item-toggle")||t.hasClass("item-link")&&t.parent().hasClass("accordion-item")){var v=t.parent(".accordion-item");0===v.length&&(v=t.parents(".accordion-item")),0===v.length&&(v=t.parents("li")),o.accordionToggle(v)}if((!o.params.ajaxLinks||t.is(o.params.ajaxLinks))&&r&&o.params.router){r&&e.preventDefault();var w=n&&n.length>0&&"#"!==n&&!h,b=t.attr("data-template");if(w||t.hasClass("back")||b){var C;if(t.attr("data-view")?C=s(t.attr("data-view"))[0].f7View:(C=t.parents("."+o.params.viewClass)[0]&&t.parents("."+o.params.viewClass)[0].f7View,C&&C.params.linksView&&("string"==typeof C.params.linksView?C=s(C.params.linksView)[0].f7View:C.params.linksView instanceof p&&(C=C.params.linksView))),C||o.mainView&&(C=o.mainView),!C)return;var y;if(b)n=void 0;else{if(0===n.indexOf("#")&&"#"!==n){if(!C.params.domCache)return;y=n.split("#")[1],n=void 0}if("#"===n&&!t.hasClass("back"))return}var x;t.attr("data-animatePages")?x=a(t.attr("data-animatePages")):(t.hasClass("with-animation")&&(x=!0),t.hasClass("no-animation")&&(x=!1));var T={animatePages:x,ignoreCache:a(t.attr("data-ignoreCache")),force:a(t.attr("data-force")),reload:a(t.attr("data-reload")),reloadPrevious:a(t.attr("data-reloadPrevious")),pageName:y,url:n};if(o.params.template7Pages){T.contextName=t.attr("data-contextName");var k=t.attr("data-context");k&&(T.context=JSON.parse(k))}b&&b in l.templates&&(T.template=l.templates[b]),t.hasClass("back")?C.router.back(T):C.router.load(T)}}}function t(e){e.preventDefault()}s(document).on("click","a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker",a),(o.params.scrollTopOnNavbarClick||o.params.scrollTopOnStatusbarClick)&&s(document).on("click",".statusbar-overlay, .navbar .center",e),o.support.touch&&s(document).on("touchstart",".panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay",t)},o.initResize=function(){s(window).on("resize",o.resize),s(window).on("orientationchange",o.orientationchange)},o.resize=function(){o.sizeNavbars&&o.sizeNavbars(),r()},o.orientationchange=function(){o.device&&o.device.minimalUi&&(90===window.orientation||-90===window.orientation)&&(document.body.scrollTop=0),r()},o.formsData={},o.formStoreData=function(e,a){o.formsData[e]=a,o.ls["f7form-"+e]=JSON.stringify(a)},o.formDeleteData=function(e){o.formsData[e]&&(o.formsData[e]="",delete o.formsData[e]),o.ls["f7form-"+e]&&(o.ls["f7form-"+e]="",o.ls.removeItem("f7form-"+e))},o.formGetData=function(e){return o.ls["f7form-"+e]?JSON.parse(o.ls["f7form-"+e]):o.formsData[e]?o.formsData[e]:void 0},o.formToJSON=function(e){if(e=s(e),1!==e.length)return!1;var a={},t=["submit","image","button","file"],n=[];return e.find("input, select, textarea").each(function(){var r=s(this),o=r.attr("name"),i=r.attr("type"),l=this.nodeName.toLowerCase();if(!(t.indexOf(i)>=0||n.indexOf(o)>=0||!o))if("select"===l&&r.attr("multiple"))n.push(o),a[o]=[],e.find('select[name="'+o+'"] option').each(function(){this.selected&&a[o].push(this.value)});else switch(i){case"checkbox":n.push(o),a[o]=[],e.find('input[name="'+o+'"]').each(function(){this.checked&&a[o].push(this.value)});break;case"radio":n.push(o),e.find('input[name="'+o+'"]').each(function(){this.checked&&(a[o]=this.value)});break;default:a[o]=r.val()}}),e.trigger("formToJSON",{formData:a}),a},o.formFromJSON=function(e,a){if(e=s(e),1!==e.length)return!1;var t=["submit","image","button","file"],n=[];e.find("input, select, textarea").each(function(){var r=s(this),o=r.attr("name"),i=r.attr("type"),l=this.nodeName.toLowerCase();if(a[o]&&!(t.indexOf(i)>=0||n.indexOf(o)>=0||!o))if("select"===l&&r.attr("multiple"))n.push(o),e.find('select[name="'+o+'"] option').each(function(){this.selected=a[o].indexOf(this.value)>=0?!0:!1});else switch(i){case"checkbox":n.push(o),e.find('input[name="'+o+'"]').each(function(){this.checked=a[o].indexOf(this.value)>=0?!0:!1});break;case"radio":n.push(o),e.find('input[name="'+o+'"]').each(function(){this.checked=a[o]===this.value?!0:!1});break;default:r.val(a[o])}}),e.trigger("formFromJSON",{formData:a})},o.initFormsStorage=function(e){function a(){var e=s(this),a=e[0].id;if(a){var t=o.formToJSON(e);t&&(o.formStoreData(a,t),e.trigger("store",{data:t}))}}function t(){n.off("change submit",a),e.off("pageBeforeRemove",t)}if(e=s(e),0!==e.length){var n=e.find("form.store-data");0!==n.length&&(n.each(function(){var e=this.getAttribute("id");if(e){var a=o.formGetData(e);a&&o.formFromJSON(this,a)}}),n.on("change submit",a),e.on("pageBeforeRemove",t))}},s(document).on("submit change","form.ajax-submit, form.ajax-submit-onchange",function(e){var a=s(this);if("change"!==e.type||a.hasClass("ajax-submit-onchange")){"submit"===e.type&&e.preventDefault();var t=a.attr("method")||"GET",n=a.attr("enctype"),r=a.attr("action");if(r){var i;i="POST"===t?new FormData(a[0]):s.serializeObject(o.formToJSON(a[0]));var l=s.ajax({method:t,url:r,contentType:n,data:i,beforeSend:function(e){a.trigger("beforeSubmit",{data:i,xhr:e})},error:function(e){a.trigger("submitError",{data:i,xhr:e})},success:function(e){a.trigger("submitted",{data:e,xhr:l})}})}}}),o.pushStateQueue=[],o.pushStateClearQueue=function(){if(0!==o.pushStateQueue.length){var e,a=o.pushStateQueue.pop();o.params.pushStateNoAnimation===!0&&(e=!1),"back"===a.action&&o.router.back(a.view,{animatePages:e}),"loadPage"===a.action&&o.router.load(a.view,{url:a.stateUrl,animatePages:e,pushState:!1}),"loadContent"===a.action&&o.router.load(a.view,{content:a.stateContent,animatePages:e,pushState:!1}),"loadPageName"===a.action&&o.router.load(a.view,{pageName:a.statePageName,animatePages:e,pushState:!1})}},o.initPushState=function(){function e(e){if(!a){var t=o.mainView;if(t){var n=e.state;if(n||(n={viewIndex:o.views.indexOf(t),url:t.history[0]}),!(n.viewIndex<0)){var r,i=o.views[n.viewIndex],s=n&&n.url||void 0,l=n&&n.content||void 0,p=n&&n.pageName||void 0;o.params.pushStateNoAnimation===!0&&(r=!1),s!==i.url&&(i.history.indexOf(s)>=0?i.allowPageChange?o.router.back(i,{url:void 0,animatePages:r,pushState:!1,preloadOnly:!1}):o.pushStateQueue.push({action:"back",view:i}):l?i.allowPageChange?o.router.load(i,{content:l,animatePages:r,pushState:!1}):o.pushStateQueue.unshift({action:"loadContent",stateContent:l,view:i}):p?i.allowPageChange?o.router.load(i,{pageName:p,animatePages:r,pushState:!1}):o.pushStateQueue.unshift({action:"loadPageName",statePageName:p,view:i}):i.allowPageChange?o.router.load(i,{url:s,animatePages:r,pushState:!1}):o.pushStateQueue.unshift({action:"loadPage",stateUrl:s,view:i}))}}}}var a=!0;s(window).on("load",function(){setTimeout(function(){a=!1},0)}),s(window).on("popstate",e)},o.swiper=function(e,a){return new Swiper(e,a)},o.initSwiper=function(e){function a(e){function a(){e.destroy(),t.off("pageBeforeRemove",a)}t.on("pageBeforeRemove",a)}var t=s(e),n=t.find(".swiper-init");if(0!==n.length)for(var r=0;r<n.length;r++){var i,l=n.eq(r);i=l.data("swiper")?JSON.parse(l.data("swiper")):{initialSlide:parseInt(l.data("initialSlide"),10)||void 0,spaceBetween:parseInt(l.data("spaceBetween"),10)||void 0,speed:parseInt(l.data("speed"),10)||void 0,slidesPerView:l.data("slidesPerView")||void 0,slidesPerColumn:parseInt(l.data("slidesPerColumn"),10)||void 0,centeredSlides:l.data("centeredSlides")&&("true"===l.data("centeredSlides")?!0:!1),direction:l.data("direction"),pagination:l.data("pagination"),paginationHide:l.data("paginationHide")&&("true"===l.data("paginationHide")?!0:!1),paginationClickable:l.data("paginationClickable")&&("true"===l.data("paginationClickable")?!0:!1),scrollbar:l.data("scrollbar"),scrollbarHide:l.data("scrollbarHide")&&("true"===l.data("scrollbarHide")?!0:!1),loop:l.data("loop")&&("true"===l.data("loop")?!0:!1),effect:l.data("effect")||"slide",freeMode:l.data("freeMode")&&("true"===l.data("freeMode")?!0:!1),onlyExternal:l.data("onlyExternal")&&("true"===l.data("onlyExternal")?!0:!1),nextButton:l.data("nextButton"),prevButton:l.data("prevButton"),autoplay:l.data("autoplay")};var p=o.swiper(l[0],i);a(p)}},o.reinitSwiper=function(e){var a=s(e),t=a.find(".swiper-init");if(0!==t.length)for(var n=0;n<t.length;n++){var r=t[0].swiper;r&&r.onResize()}};var h=function(e){var a,t=this,n={photos:[],initialSlide:0,spaceBetween:20,speed:300,zoom:!0,maxZoom:3,minZoom:1,exposition:!0,expositionHideCaptions:!1,type:"standalone",navbar:!0,toolbar:!0,theme:"light",swipeToClose:!0,backLinkText:"Close",ofText:"of",loop:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1};e=e||{};for(var r in n)"undefined"==typeof e[r]&&(e[r]=n[r]);t.params=e;var i="dark"===t.params.theme?"color-white":"",l=t.params.navbarTemplate||'<div class="navbar"><div class="navbar-inner"><div class="left sliding"><a href="#" class="link '+("page"===t.params.type&&"back")+' close-popup photo-browser-close-link" data-popup=".photo-browser-popup"><i class="icon icon-back '+i+'"></i><span>'+t.params.backLinkText+'</span></a></div><div class="center sliding"><span class="photo-browser-current"></span> <span class="photo-browser-of">'+t.params.ofText+'</span> <span class="photo-browser-total"></span></div><div class="right"></div></div></div>',p=t.params.toolbarTemplate||'<div class="toolbar tabbar"><div class="toolbar-inner"><a href="#" class="link photo-browser-prev"><i class="icon icon-prev '+i+'"></i></a><a href="#" class="link photo-browser-next"><i class="icon icon-next '+i+'"></i></a></div></div>',d=t.params.template||'<div class="photo-browser photo-browser-'+t.params.theme+'"><div class="view navbar-fixed toolbar-fixed">{{navbar}}<div data-page="photo-browser-slides" class="page no-toolbar {{noNavbar}} toolbar-fixed navbar-fixed">{{toolbar}}{{captions}}<div class="photo-browser-swiper-container swiper-container"><div class="photo-browser-swiper-wrapper swiper-wrapper">{{photos}}</div></div></div></div></div>',c=t.params.lazyLoading?t.params.photoLazyTemplate||'<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide"><div class="preloader'+("dark"===t.params.theme?" preloader-white":"")+'"></div><span class="photo-browser-zoom-container"><img data-src="{{url}}"></span></div>':t.params.photoTemplate||'<div class="photo-browser-slide swiper-slide"><span class="photo-browser-zoom-container"><img src="{{url}}"></span></div>',f=t.params.captionsTheme||t.params.theme,u=t.params.captionsTemplate||'<div class="photo-browser-captions photo-browser-captions-'+f+'">{{captions}}</div>',h=t.params.captionTemplate||'<div class="photo-browser-caption" data-caption-index="{{captionIndex}}">{{caption}}</div>',m=t.params.objectTemplate||'<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{html}}</div>',g="",v="";for(a=0;a<t.params.photos.length;a++){var w=t.params.photos[a],b="";"string"==typeof w||w instanceof String?b=w.indexOf("<")>=0||w.indexOf(">")>=0?m.replace(/{{html}}/g,w):c.replace(/{{url}}/g,w):"object"==typeof w&&(w.hasOwnProperty("html")&&w.html.length>0?b=m.replace(/{{html}}/g,w.html):w.hasOwnProperty("url")&&w.url.length>0&&(b=c.replace(/{{url}}/g,w.url)),w.hasOwnProperty("caption")&&w.caption.length>0?v+=h.replace(/{{caption}}/g,w.caption).replace(/{{captionIndex}}/g,a):b=b.replace(/{{caption}}/g,"")),g+=b}var C=d.replace("{{navbar}}",t.params.navbar?l:"").replace("{{noNavbar}}",t.params.navbar?"":"no-navbar").replace("{{photos}}",g).replace("{{captions}}",u.replace(/{{captions}}/g,v)).replace("{{toolbar}}",t.params.toolbar?p:"");t.activeIndex=t.params.initialSlide,t.openIndex=t.activeIndex,t.opened=!1,t.open=function(e){return"undefined"==typeof e&&(e=t.activeIndex),e=parseInt(e,10),t.opened&&t.swiper?void t.swiper.slideTo(e):(t.opened=!0,t.openIndex=e,t.initialLazyLoaded=!1,"standalone"===t.params.type&&s("body").append(C),"popup"===t.params.type&&(t.popup=o.popup('<div class="popup photo-browser-popup">'+C+"</div>"),s(t.popup).on("closed",t.onPopupClose)),"page"===t.params.type?(s(document).on("pageBeforeInit",t.onPageBeforeInit),s(document).on("pageBeforeRemove",t.onPageBeforeRemove),t.params.view||(t.params.view=o.mainView),void t.params.view.loadContent(C)):(t.layout(t.openIndex),void(t.params.onOpen&&t.params.onOpen(t))))},t.close=function(){t.opened=!1,t.swiperContainer&&0!==t.swiperContainer.length&&(t.params.onClose&&t.params.onClose(t),t.attachEvents(!0),"standalone"===t.params.type&&t.container.removeClass("photo-browser-in").addClass("photo-browser-out").animationEnd(function(){t.container.remove()}),t.swiper.destroy(),t.swiper=t.swiperContainer=t.swiperWrapper=t.slides=y=x=T=void 0)},t.onPopupClose=function(){t.close(),s(t.popup).off("pageBeforeInit",t.onPopupClose)},t.onPageBeforeInit=function(e){"photo-browser-slides"===e.detail.page.name&&t.layout(t.openIndex),s(document).off("pageBeforeInit",t.onPageBeforeInit)},t.onPageBeforeRemove=function(e){"photo-browser-slides"===e.detail.page.name&&t.close(),s(document).off("pageBeforeRemove",t.onPageBeforeRemove)},t.loadImageInSlide=function(e,a){if(e&&"undefined"!=typeof a&&0!==e.slides.length){var n=e.slides.eq(a);if(n.hasClass("photo-browser-slide-lazy")){var r=n.find("img");if(0!==r.length){var o=new Image,i=r.attr("data-src");o.onload=function(){r.attr("src",i),r.removeAttr("data-src"),n.removeClass("photo-browser-slide-lazy").find(".preloader").remove(),t.params.onImageLoaded&&t.params.onImageLoaded(t,n[0],r[0])},o.src=i,t.params.onImageLoad&&t.params.onImageLoad(t,n[0],r[0])}}}},t.lazyLoading=function(e,a){if(t.loadImageInSlide(e,a),t.params.lazyLoadingInPrevNext){var n=e.wrapper.find(".swiper-slide-next.photo-browser-slide-lazy");n.length>0&&t.loadImageInSlide(e,n.index());var r=e.wrapper.find(".swiper-slide-prev.photo-browser-slide-lazy");r.length>0&&t.loadImageInSlide(e,r.index())}},t.onSliderTransitionStart=function(e){t.activeIndex=e.activeIndex;var a=e.activeIndex+1,n=e.slides.length;if(t.params.loop&&(n-=2,a-=e.loopedSlides,1>a&&(a=n+a),a>n&&(a-=n)),t.container.find(".photo-browser-current").text(a),t.container.find(".photo-browser-total").text(n),s(".photo-browser-prev, .photo-browser-next").removeClass("photo-browser-link-inactive"),e.isBeginning&&!t.params.loop&&s(".photo-browser-prev").addClass("photo-browser-link-inactive"),e.isEnd&&!t.params.loop&&s(".photo-browser-next").addClass("photo-browser-link-inactive"),t.captions.length>0){t.captionsContainer.find(".photo-browser-caption-active").removeClass("photo-browser-caption-active");var r=t.params.loop?e.slides.eq(e.activeIndex).attr("data-swiper-slide-index"):t.activeIndex;t.captionsContainer.find('[data-caption-index="'+r+'"]').addClass("photo-browser-caption-active")}t.params.lazyLoading&&(t.params.lazyLoadingOnTransitionStart||!t.params.lazyLoadingOnTransitionStart&&!t.initialLazyLoaded)&&(t.initialLazyLoaded=!0,t.lazyLoading(e,t.activeIndex));var o=e.slides.eq(e.previousIndex).find("video");o.length>0&&"pause"in o[0]&&o[0].pause(),t.params.onSlideChangeStart&&t.params.onSlideChangeStart(e)},t.onSliderTransitionEnd=function(e){t.params.lazyLoading&&!t.params.lazyLoadingOnTransitionStart&&t.lazyLoading(e,t.activeIndex),t.params.zoom&&y&&e.previousIndex!==e.activeIndex&&(x.transform("translate3d(0,0,0) scale(1)"),T.transform("translate3d(0,0,0)"),y=x=T=void 0,k=S=1),t.params.onSlideChangeEnd&&t.params.onSlideChangeEnd(e)},t.layout=function(e){t.container="page"===t.params.type?s(".photo-browser-swiper-container").parents(".view"):s(".photo-browser"),"standalone"===t.params.type&&(t.container.addClass("photo-browser-in"),o.sizeNavbars(t.container)),t.swiperContainer=t.container.find(".photo-browser-swiper-container"),t.swiperWrapper=t.container.find(".photo-browser-swiper-wrapper"),t.slides=t.container.find(".photo-browser-slide"),t.captionsContainer=t.container.find(".photo-browser-captions"),t.captions=t.container.find(".photo-browser-caption");var a={nextButton:t.params.nextButton||".photo-browser-next",prevButton:t.params.prevButton||".photo-browser-prev",indexButton:t.params.indexButton,initialSlide:e,spaceBetween:t.params.spaceBetween,speed:t.params.speed,loop:t.params.loop,onTap:function(e,a){t.params.onTap&&t.params.onTap(e,a)},onClick:function(e,a){t.params.exposition&&t.toggleExposition(),t.params.onClick&&t.params.onClick(e,a)},onDoubleTap:function(e,a){t.toggleZoom(s(a.target).parents(".photo-browser-slide")),t.params.onDoubleTap&&t.params.onDoubleTap(e,a)},onTransitionStart:function(e){t.onSliderTransitionStart(e)},onTransitionEnd:function(e){t.onSliderTransitionEnd(e)}};t.params.swipeToClose&&"page"!==t.params.type&&(a.onTouchStart=t.swipeCloseTouchStart,a.onTouchMoveOpposite=t.swipeCloseTouchMove,a.onTouchEnd=t.swipeCloseTouchEnd),t.swiper=o.swiper(t.swiperContainer,a),0===e&&t.onSliderTransitionStart(t.swiper),t.attachEvents()},t.attachEvents=function(e){var a=e?"off":"on";if(t.params.zoom){var n=t.params.loop?t.swiper.slides:t.slides;n[a]("gesturestart",t.onSlideGestureStart),n[a]("gesturechange",t.onSlideGestureChange),n[a]("gestureend",t.onSlideGestureEnd),n[a](o.touchEvents.start,t.onSlideTouchStart),n[a](o.touchEvents.move,t.onSlideTouchMove),n[a](o.touchEvents.end,t.onSlideTouchEnd)}t.container.find(".photo-browser-close-link")[a]("click",t.close)};t.exposed=!1,t.toggleExposition=function(){t.container&&t.container.toggleClass("photo-browser-exposed"),t.params.expositionHideCaptions&&t.captionsContainer.toggleClass("photo-browser-captions-exposed"),t.exposed=!t.exposed},t.enableExposition=function(){t.container&&t.container.addClass("photo-browser-exposed"),t.params.expositionHideCaptions&&t.captionsContainer.addClass("photo-browser-captions-exposed"),t.exposed=!0},t.disableExposition=function(){t.container&&t.container.removeClass("photo-browser-exposed"),t.params.expositionHideCaptions&&t.captionsContainer.removeClass("photo-browser-captions-exposed"),t.exposed=!1};var y,x,T,k=1,S=1,P=!1;t.onSlideGestureStart=function(){return y||(y=s(this),x=y.find("img, svg, canvas"),T=x.parent(".photo-browser-zoom-container"),0!==T.length)?(x.transition(0),void(P=!0)):void(x=void 0)},t.onSlideGestureChange=function(e){x&&0!==x.length&&(k=e.scale*S,k>t.params.maxZoom&&(k=t.params.maxZoom-1+Math.pow(k-t.params.maxZoom+1,.5)),k<t.params.minZoom&&(k=t.params.minZoom+1-Math.pow(t.params.minZoom-k+1,.5)),x.transform("translate3d(0,0,0) scale("+k+")"))},t.onSlideGestureEnd=function(){x&&0!==x.length&&(k=Math.max(Math.min(k,t.params.maxZoom),t.params.minZoom),x.transition(t.params.speed).transform("translate3d(0,0,0) scale("+k+")"),S=k,P=!1,1===k&&(y=void 0))},t.toggleZoom=function(){y||(y=t.swiper.slides.eq(t.swiper.activeIndex),x=y.find("img, svg, canvas"),T=x.parent(".photo-browser-zoom-container")),x&&0!==x.length&&(T.transition(300).transform("translate3d(0,0,0)"),k&&1!==k?(k=S=1,x.transition(300).transform("translate3d(0,0,0) scale(1)"),y=void 0):(k=S=t.params.maxZoom,x.transition(300).transform("translate3d(0,0,0) scale("+k+")")))};var M,O,I,D,E,L,N,B,A,z,H,R,V,q,Y,G,F,W={},j={};t.onSlideTouchStart=function(e){x&&0!==x.length&&(M||("android"===o.device.os&&e.preventDefault(),M=!0,W.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,W.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))},t.onSlideTouchMove=function(e){if(x&&0!==x.length&&(t.swiper.allowClick=!1,M&&y)){O||(A=x[0].offsetWidth,z=x[0].offsetHeight,H=s.getTranslate(T[0],"x")||0,R=s.getTranslate(T[0],"y")||0,T.transition(0));var a=A*k,n=z*k;if(!(a<t.swiper.width&&n<t.swiper.height)){if(E=Math.min(t.swiper.width/2-a/2,0),N=-E,L=Math.min(t.swiper.height/2-n/2,0),B=-L,j.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,j.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!O&&!P&&(Math.floor(E)===Math.floor(H)&&j.x<W.x||Math.floor(N)===Math.floor(H)&&j.x>W.x))return void(M=!1);e.preventDefault(),e.stopPropagation(),O=!0,I=j.x-W.x+H,D=j.y-W.y+R,E>I&&(I=E+1-Math.pow(E-I+1,.8)),I>N&&(I=N-1+Math.pow(I-N+1,.8)),L>D&&(D=L+1-Math.pow(L-D+1,.8)),D>B&&(D=B-1+Math.pow(D-B+1,.8)),V||(V=j.x),G||(G=j.y),q||(q=Date.now()),Y=(j.x-V)/(Date.now()-q)/2,F=(j.y-G)/(Date.now()-q)/2,Math.abs(j.x-V)<2&&(Y=0),Math.abs(j.y-G)<2&&(F=0),V=j.x,G=j.y,q=Date.now(),T.transform("translate3d("+I+"px, "+D+"px,0)")}}},t.onSlideTouchEnd=function(){if(x&&0!==x.length){if(!M||!O)return M=!1,void(O=!1);M=!1,O=!1;var e=300,a=300,n=Y*e,r=I+n,o=F*a,i=D+o;0!==Y&&(e=Math.abs((r-I)/Y)),0!==F&&(a=Math.abs((i-D)/F));var s=Math.max(e,a);I=r,D=i;var l=A*k,p=z*k;E=Math.min(t.swiper.width/2-l/2,0),N=-E,L=Math.min(t.swiper.height/2-p/2,0),B=-L,I=Math.max(Math.min(I,N),E),D=Math.max(Math.min(D,B),L),T.transition(s).transform("translate3d("+I+"px, "+D+"px,0)")}};var X,_,U,J,Q,K=!1,Z=!0,$=!1;return t.swipeCloseTouchStart=function(){Z&&(K=!0)},t.swipeCloseTouchMove=function(e,a){if(K){$||($=!0,_="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,J=t.swiper.slides.eq(t.swiper.activeIndex),Q=(new Date).getTime()),a.preventDefault(),U="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,X=_-U;var n=1-Math.abs(X)/300;J.transform("translate3d(0,"+-X+"px,0)"),t.swiper.container.css("opacity",n).transition(0)}},t.swipeCloseTouchEnd=function(){if(K=!1,!$)return void($=!1);$=!1,Z=!1;var e=Math.abs(X),a=(new Date).getTime()-Q;return 300>a&&e>20||a>=300&&e>100?void setTimeout(function(){"standalone"===t.params.type&&t.close(),"popup"===t.params.type&&o.closeModal(t.popup),t.params.onSwipeToClose&&t.params.onSwipeToClose(t),Z=!0},0):(0!==e?J.addClass("transitioning").transitionEnd(function(){Z=!0,J.removeClass("transitioning")}):Z=!0,t.swiper.container.css("opacity","").transition(""),void J.transform(""))},t};o.photoBrowser=function(e){return new h(e)};var m=function(e){function a(){var e=!1;return p.params.convertToPopover?(!p.inline&&p.params.input&&(o.device.ios?e=o.device.ipad?!0:!1:s(window).width()>=768&&(e=!0)),e):e}function t(){return p.opened&&p.container&&p.container.length>0&&p.container.parents(".popover").length>0?!0:!1}function n(){if(p.opened)for(var e=0;e<p.cols.length;e++)p.cols[e].divider||(p.cols[e].calcSize(),p.cols[e].setValue(p.cols[e].value,0,!1))}function r(e){if(e.preventDefault(),!p.opened&&(p.open(),p.params.scrollToInput&&!a())){var t=p.input.parents(".page-content");if(0===t.length)return;var n,r=parseInt(t.css("padding-top"),10),o=parseInt(t.css("padding-bottom"),10),i=t[0].offsetHeight-r-p.container.height(),s=t[0].scrollHeight-r-p.container.height(),l=p.input.offset().top-r+p.input[0].offsetHeight;if(l>i){var d=t.scrollTop()+l-i;d+i>s&&(n=d+i-s+o,i===s&&(n=p.container.height()),t.css({"padding-bottom":n+"px"})),t.scrollTop(d,300)}}}function i(e){t()||(p.input&&p.input.length>0?e.target!==p.input[0]&&0===s(e.target).parents(".picker-modal").length&&p.close():0===s(e.target).parents(".picker-modal").length&&p.close())}function l(){p.opened=!1,p.input.parents(".page-content").css({"padding-bottom":""}),p.params.onClose&&p.params.onClose(p),p.container.find(".picker-items-col").each(function(){p.destroyPickerCol(this)})}var p=this,d={updateValuesOnMomentum:!1,updateValuesOnTouchmove:!0,rotateEffect:!1,momentumRatio:7,freeMode:!1,scrollToInput:!0,inputReadOnly:!0,convertToPopover:!0,toolbar:!0,toolbarCloseText:"Done",toolbarTemplate:'<div class="toolbar"><div class="toolbar-inner"><div class="left"></div><div class="right"><a href="#" class="link close-picker">{{closeText}}</a></div></div></div>'};e=e||{};for(var c in d)"undefined"==typeof e[c]&&(e[c]=d[c]);p.params=e,p.cols=[],p.initialized=!1,p.inline=p.params.container?!0:!1;var f=o.device.ios||navigator.userAgent.toLowerCase().indexOf("safari")>=0&&navigator.userAgent.toLowerCase().indexOf("chrome")<0&&!o.device.android;return p.setValue=function(e,a){for(var t=0,n=0;n<p.cols.length;n++)p.cols[n]&&!p.cols[n].divider&&(p.cols[n].setValue(e[t],a),t++)},p.updateValue=function(){for(var e=[],a=[],t=0;t<p.cols.length;t++)p.cols[t].divider||(e.push(p.cols[t].value),a.push(p.cols[t].displayValue));e.indexOf(void 0)>=0||(p.value=e,p.displayValue=a,p.params.onChange&&p.params.onChange(p,p.value,p.displayValue),p.input&&p.input.length>0&&(s(p.input).val(p.params.formatValue?p.params.formatValue(p,p.value,p.displayValue):p.value.join(" ")),s(p.input).trigger("change")))},p.initPickerCol=function(e,a){function t(){b=s.requestAnimationFrame(function(){u.updateItems(void 0,void 0,0),t()})}function n(e){y||C||(e.preventDefault(),C=!0,x=T="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,k=(new Date).getTime(),L=!0,P=O=s.getTranslate(u.wrapper[0],"y"))}function r(e){if(C){e.preventDefault(),L=!1,T="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,y||(s.cancelAnimationFrame(b),y=!0,P=O=s.getTranslate(u.wrapper[0],"y"),u.wrapper.transition(0)),e.preventDefault();var a=T-x;O=P+a,M=void 0,v>O&&(O=v-Math.pow(v-O,.8),M="min"),O>w&&(O=w+Math.pow(O-w,.8),M="max"),u.wrapper.transform("translate3d(0,"+O+"px,0)"),u.updateItems(void 0,O,0,p.params.updateValuesOnTouchmove),D=O-I||O,E=(new Date).getTime(),I=O}}function i(){if(!C||!y)return void(C=y=!1);C=y=!1,u.wrapper.transition(""),M&&u.wrapper.transform("min"===M?"translate3d(0,"+v+"px,0)":"translate3d(0,"+w+"px,0)"),S=(new Date).getTime();var e,a;S-k>300?a=O:(e=Math.abs(D/(S-E)),a=O+D*p.params.momentumRatio),a=Math.max(Math.min(a,w),v);var n=-Math.floor((a-w)/m);p.params.freeMode||(a=-n*m+w),u.wrapper.transform("translate3d(0,"+parseInt(a,10)+"px,0)"),u.updateItems(n,a,"",!0),p.params.updateValuesOnMomentum&&(t(),u.wrapper.transitionEnd(function(){s.cancelAnimationFrame(b)})),setTimeout(function(){L=!0},100)}function l(){if(L){s.cancelAnimationFrame(b);var e=s(this).attr("data-picker-value");u.setValue(e)}}var d=s(e),c=d.index(),u=p.cols[c];if(!u.divider){u.container=d,u.wrapper=u.container.find(".picker-items-col-wrapper"),u.items=u.wrapper.find(".picker-item");var h,m,g,v,w;u.replaceValues=function(e,a){u.values=e,u.displayValues=a;var t=p.columnHTML(u,!0);u.wrapper.html(t),u.items=u.wrapper.find(".picker-item"),u.calcSize(),u.setValue(u.values[0],0,!0)},u.calcSize=function(){p.params.rotateEffect&&(u.container.removeClass("picker-items-col-absolute"),u.width||u.container.css({width:""}));var e,a;e=0,a=u.container[0].offsetHeight,h=u.wrapper[0].offsetHeight,m=u.items[0].offsetHeight,g=m*u.items.length,v=a/2-g+m/2,w=a/2-m/2,u.width&&(e=u.width,parseInt(e,10)===e&&(e+="px"),u.container.css({width:e})),p.params.rotateEffect&&(u.width||(u.items.each(function(){var a=s(this);a.css({width:"auto"}),e=Math.max(e,a[0].offsetWidth),a.css({width:""})}),u.container.css({width:e+2+"px"})),u.container.addClass("picker-items-col-absolute"))},u.calcSize(),u.wrapper.transform("translate3d(0,"+w+"px,0)").transition(0);var b;u.setValue=function(e,a,n){"undefined"==typeof a&&(a="");var r=u.wrapper.find('.picker-item[data-picker-value="'+e+'"]').index();if("undefined"!=typeof r&&-1!==r){var o=-r*m+w;u.wrapper.transition(a),u.wrapper.transform("translate3d(0,"+o+"px,0)"),p.params.updateValuesOnMomentum&&u.activeIndex&&u.activeIndex!==r&&(s.cancelAnimationFrame(b),u.wrapper.transitionEnd(function(){s.cancelAnimationFrame(b)}),t()),u.updateItems(r,o,a,n)}},u.updateItems=function(e,a,t,n){"undefined"==typeof a&&(a=s.getTranslate(u.wrapper[0],"y")),"undefined"==typeof e&&(e=-Math.round((a-w)/m)),0>e&&(e=0),e>=u.items.length&&(e=u.items.length-1);var r=u.activeIndex;u.activeIndex=e,u.wrapper.find(".picker-selected, .picker-after-selected, .picker-before-selected").removeClass("picker-selected picker-after-selected picker-before-selected"),u.items.transition(t);{var o=u.items.eq(e).addClass("picker-selected").transform("");o.prevAll().addClass("picker-before-selected"),o.nextAll().addClass("picker-after-selected")}if((n||"undefined"==typeof n)&&(u.value=o.attr("data-picker-value"),u.displayValue=u.displayValues?u.displayValues[e]:u.value,r!==e&&(u.onChange&&u.onChange(p,u.value,u.displayValue),p.updateValue())),p.params.rotateEffect){{(a-(Math.floor((a-w)/m)*m+w))/m}u.items.each(function(){var e=s(this),t=e.index()*m,n=w-a,r=t-n,o=r/m,i=Math.ceil(u.height/m/2)+1,l=-18*o;l>180&&(l=180),-180>l&&(l=-180),Math.abs(o)>i?e.addClass("picker-item-far"):e.removeClass("picker-item-far"),e.transform("translate3d(0, "+(-a+w)+"px, "+(f?-110:0)+"px) rotateX("+l+"deg)")})}},a&&u.updateItems(0,w,0);var C,y,x,T,k,S,P,M,O,I,D,E,L=!0;u.container.on(o.touchEvents.start,n),u.container.on(o.touchEvents.move,r),u.container.on(o.touchEvents.end,i),u.items.on("click",l),u.container[0].f7DestroyPickerCol=function(){u.container.off(o.touchEvents.start,n),u.container.off(o.touchEvents.move,r),u.container.off(o.touchEvents.end,i),u.items.off("click",l)}}},p.destroyPickerCol=function(e){e=s(e),"f7DestroyPickerCol"in e[0]&&e[0].f7DestroyPickerCol()},s(window).on("resize",n),p.columnHTML=function(e,a){var t="",n="";if(e.divider)n+='<div class="picker-items-col picker-items-col-divider '+(e.textAlign?"picker-items-col-"+e.textAlign:"")+" "+(e.cssClass||"")+'">'+e.content+"</div>";else{for(var r=0;r<e.values.length;r++)t+='<div class="picker-item" data-picker-value="'+e.values[r]+'">'+(e.displayValues?e.displayValues[r]:e.values[r])+"</div>";n+='<div class="picker-items-col '+(e.textAlign?"picker-items-col-"+e.textAlign:"")+" "+(e.cssClass||"")+'"><div class="picker-items-col-wrapper">'+t+"</div></div>"}return a?t:n},p.layout=function(){var e,a="",t="";p.cols=[];var n="";for(e=0;e<p.params.cols.length;e++){var r=p.params.cols[e];n+=p.columnHTML(p.params.cols[e]),p.cols.push(r)}t="picker-modal picker-columns "+(p.params.cssClass||"")+(p.params.rotateEffect?" picker-3d":""),a='<div class="'+t+'">'+(p.params.toolbar?p.params.toolbarTemplate.replace(/{{closeText}}/g,p.params.toolbarCloseText):"")+'<div class="picker-modal-inner picker-items">'+n+'<div class="picker-center-highlight"></div></div></div>',p.pickerHTML=a},p.params.input&&(p.input=s(p.params.input),p.params.inputReadOnly&&p.input.prop("readOnly",!0),p.inline||p.input.on("click",r),p.params.inputReadOnly&&p.input.on("focus mousedown",function(e){e.preventDefault()})),p.inline||s("html").on("click",i),p.opened=!1,p.open=function(){var e=a();
p.opened||(p.layout(),e?(p.pickerHTML='<div class="popover popover-picker-columns"><div class="popover-inner">'+p.pickerHTML+"</div></div>",p.popover=o.popover(p.pickerHTML,p.params.input,!0),p.container=s(p.popover).find(".picker-modal"),s(p.popover).on("close",function(){l()})):p.inline?(p.container=s(p.pickerHTML),p.container.addClass("picker-modal-inline"),s(p.params.container).append(p.container)):(p.container=s(o.pickerModal(p.pickerHTML)),s(p.container).on("close",function(){l()})),p.container[0].f7Picker=p,p.container.find(".picker-items-col").each(function(){var e=!0;(!p.initialized&&p.params.value||p.initialized&&p.value)&&(e=!1),p.initPickerCol(this,e)}),p.initialized?p.value&&p.setValue(p.value,0):p.params.value&&p.setValue(p.params.value,0)),p.opened=!0,p.initialized=!0,p.params.onOpen&&p.params.onOpen(p)},p.close=function(){return p.opened&&!p.inline?t()?void o.closeModal(p.popover):void o.closeModal(p.container):void 0},p.destroy=function(){p.close(),p.params.input&&p.input.off("click focus",r),s("html").off("click",i),s(window).off("resize",n)},p.inline&&p.open(),p};o.picker=function(e){return new m(e)};var g=function(e){function a(){var e=!1;return p.params.convertToPopover?(!p.inline&&p.params.input&&(o.device.ios?e=o.device.ipad?!0:!1:s(window).width()>=768&&(e=!0)),e):e}function t(){return p.opened&&p.container&&p.container.length>0&&p.container.parents(".popover").length>0?!0:!1}function n(e){e=new Date(e);var a=e.getFullYear(),t=e.getMonth(),n=t+1,r=e.getDate(),o=e.getDay();return p.params.dateFormat.replace(/yyyy/g,a).replace(/yy/g,(a+"").substring(2)).replace(/mm/g,10>n?"0"+n:n).replace(/m/g,n).replace(/MM/g,p.params.monthNames[t]).replace(/M/g,p.params.monthNamesShort[t]).replace(/dd/g,10>r?"0"+r:r).replace(/d/g,r).replace(/DD/g,p.params.dayNames[o]).replace(/D/g,p.params.dayNamesShort[o])}function r(e){if(e.preventDefault(),!p.opened&&(p.open(),p.params.scrollToInput&&!a())){var t=p.input.parents(".page-content");if(0===t.length)return;var n,r=parseInt(t.css("padding-top"),10),o=parseInt(t.css("padding-bottom"),10),i=t[0].offsetHeight-r-p.container.height(),s=t[0].scrollHeight-r-p.container.height(),l=p.input.offset().top-r+p.input[0].offsetHeight;if(l>i){var d=t.scrollTop()+l-i;d+i>s&&(n=d+i-s+o,i===s&&(n=p.container.height()),t.css({"padding-bottom":n+"px"})),t.scrollTop(d,300)}}}function i(e){t()||(p.input&&p.input.length>0?e.target!==p.input[0]&&0===s(e.target).parents(".picker-modal").length&&p.close():0===s(e.target).parents(".picker-modal").length&&p.close())}function l(){p.opened=!1,p.input.parents(".page-content").css({"padding-bottom":""}),p.params.onClose&&p.params.onClose(p),p.destroyCalendarEvents()}var p=this,d={monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDay:1,weekendDays:[0,6],multiple:!1,dateFormat:"yyyy-mm-dd",direction:"horizontal",minDate:null,maxDate:null,touchMove:!0,animate:!0,closeOnSelect:!1,monthPicker:!0,monthPickerTemplate:'<div class="picker-calendar-month-picker"><a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a><span class="current-month-value"></span><a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a></div>',yearPicker:!0,yearPickerTemplate:'<div class="picker-calendar-year-picker"><a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a><span class="current-year-value"></span><a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a></div>',weekHeader:!0,scrollToInput:!0,inputReadOnly:!0,convertToPopover:!0,toolbar:!0,toolbarCloseText:"Done",toolbarTemplate:'<div class="toolbar"><div class="toolbar-inner">{{monthPicker}}{{yearPicker}}</div></div>'};e=e||{};for(var c in d)"undefined"==typeof e[c]&&(e[c]=d[c]);p.params=e,p.initialized=!1,p.inline=p.params.container?!0:!1,p.isH="horizontal"===p.params.direction;var f=p.isH&&o.rtl?-1:1;return p.animating=!1,p.addValue=function(e){if(p.params.multiple){p.value||(p.value=[]);for(var a,t=0;t<p.value.length;t++)new Date(e).getTime()===new Date(p.value[t]).getTime()&&(a=t);"undefined"==typeof a?p.value.push(e):p.value.splice(a,1),p.updateValue()}else p.value=[e],p.updateValue()},p.setValue=function(e){p.value=e,p.updateValue()},p.updateValue=function(){p.wrapper.find(".picker-calendar-day-selected").removeClass("picker-calendar-day-selected");var e,a;for(e=0;e<p.value.length;e++){var t=new Date(p.value[e]);p.wrapper.find('.picker-calendar-day[data-date="'+t.getFullYear()+"-"+t.getMonth()+"-"+t.getDate()+'"]').addClass("picker-calendar-day-selected")}if(p.params.onChange&&p.params.onChange(p,p.value),p.input&&p.input.length>0){if(p.params.formatValue)a=p.params.formatValue(p,p.value);else{for(a=[],e=0;e<p.value.length;e++)a.push(n(p.value[e]));a=a.join(", ")}s(p.input).val(a),s(p.input).trigger("change")}},p.initCalendarEvents=function(){function e(e){i||r||(r=!0,l=u="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,d=u="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,h=(new Date).getTime(),C=0,T=!0,x=void 0,g=v=p.monthsTranslate)}function a(e){if(r){if(c="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,u="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof x&&(x=!!(x||Math.abs(u-d)>Math.abs(c-l))),p.isH&&x)return void(r=!1);if(e.preventDefault(),p.animating)return void(r=!1);T=!1,i||(i=!0,w=p.wrapper[0].offsetWidth,b=p.wrapper[0].offsetHeight,p.wrapper.transition(0)),e.preventDefault(),y=p.isH?c-l:u-d,C=y/(p.isH?w:b),v=100*(p.monthsTranslate*f+C),p.wrapper.transform("translate3d("+(p.isH?v:0)+"%, "+(p.isH?0:v)+"%, 0)")}}function t(){return r&&i?(r=i=!1,m=(new Date).getTime(),300>m-h?Math.abs(y)<10?p.resetMonth():y>=10?o.rtl?p.nextMonth():p.prevMonth():o.rtl?p.prevMonth():p.nextMonth():-.5>=C?o.rtl?p.prevMonth():p.nextMonth():C>=.5?o.rtl?p.nextMonth():p.prevMonth():p.resetMonth(),void setTimeout(function(){T=!0},100)):void(r=i=!1)}function n(e){if(T){var a=s(e.target).parents(".picker-calendar-day");if(0===a.length&&s(e.target).hasClass("picker-calendar-day")&&(a=s(e.target)),0!==a.length&&(!a.hasClass("picker-calendar-day-selected")||p.params.multiple)&&!a.hasClass("picker-calendar-day-disabled")){a.hasClass("picker-calendar-day-next")&&p.nextMonth(),a.hasClass("picker-calendar-day-prev")&&p.prevMonth();var t=a.attr("data-year"),n=a.attr("data-month"),r=a.attr("data-day");p.params.onDayClick&&p.params.onDayClick(p,a[0],t,n,r),p.addValue(new Date(t,n,r).getTime()),p.params.closeOnSelect&&p.close()}}}var r,i,l,d,c,u,h,m,g,v,w,b,C,y,x,T=!0;p.container.find(".picker-calendar-prev-month").on("click",p.prevMonth),p.container.find(".picker-calendar-next-month").on("click",p.nextMonth),p.container.find(".picker-calendar-prev-year").on("click",p.prevYear),p.container.find(".picker-calendar-next-year").on("click",p.nextYear),p.wrapper.on("click",n),p.params.touchMove&&(p.wrapper.on(o.touchEvents.start,e),p.wrapper.on(o.touchEvents.move,a),p.wrapper.on(o.touchEvents.end,t)),p.container[0].f7DestroyCalendarEvents=function(){p.container.find(".picker-calendar-prev-month").off("click",p.prevMonth),p.container.find(".picker-calendar-next-month").off("click",p.nextMonth),p.container.find(".picker-calendar-prev-year").off("click",p.prevYear),p.container.find(".picker-calendar-next-year").off("click",p.nextYear),p.wrapper.off("click",n),p.params.touchMove&&(p.wrapper.off(o.touchEvents.start,e),p.wrapper.off(o.touchEvents.move,a),p.wrapper.off(o.touchEvents.end,t))}},p.destroyCalendarEvents=function(){"f7DestroyCalendarEvents"in p.container[0]&&p.container[0].f7DestroyCalendarEvents()},p.daysInMonth=function(e){var a=new Date(e);return new Date(a.getFullYear(),a.getMonth()+1,0).getDate()},p.monthHTML=function(e,a){e=new Date(e);{var t=e.getFullYear(),n=e.getMonth();e.getDate()}"next"===a&&(e=11===n?new Date(t+1,0):new Date(t,n+1,1)),"prev"===a&&(e=0===n?new Date(t-1,11):new Date(t,n-1,1)),("next"===a||"prev"===a)&&(n=e.getMonth(),t=e.getFullYear());var r=p.daysInMonth(new Date(e.getFullYear(),e.getMonth()).getTime()-864e6),o=p.daysInMonth(e),i=new Date(e.getFullYear(),e.getMonth()).getDay();0===i&&(i=7);var s,l,d,c=[],f=6,u=7,h="",m=0+(p.params.firstDay-1),g=(new Date).setHours(0,0,0,0),v=p.params.minDate?new Date(p.params.minDate).getTime():null,w=p.params.maxDate?new Date(p.params.maxDate).getTime():null;if(p.value&&p.value.length)for(l=0;l<p.value.length;l++)c.push(new Date(p.value[l]).setHours(0,0,0,0));for(l=1;f>=l;l++){var b="";for(d=1;u>=d;d++){var C=d;m++;var y=m-i,x="";0>y?(y=r+y+1,x+=" picker-calendar-day-prev",s=new Date(0>n-1?t-1:t,0>n-1?11:n-1,y).getTime()):(y+=1,y>o?(y-=o,x+=" picker-calendar-day-next",s=new Date(n+1>11?t+1:t,n+1>11?0:n+1,y).getTime()):s=new Date(t,n,y).getTime()),s===g&&(x+=" picker-calendar-day-today"),c.indexOf(s)>=0&&(x+=" picker-calendar-day-selected"),p.params.weekendDays.indexOf(C-1)>=0&&(x+=" picker-calendar-day-weekend"),(v&&v>s||w&&s>w)&&(x+=" picker-calendar-day-disabled"),s=new Date(s);var T=s.getFullYear(),k=s.getMonth();b+='<div data-year="'+T+'" data-month="'+k+'" data-day="'+y+'" class="picker-calendar-day'+x+'" data-date="'+(T+"-"+k+"-"+y)+'"><span>'+y+"</span></div>"}h+='<div class="picker-calendar-row">'+b+"</div>"}return h='<div class="picker-calendar-month" data-year="'+t+'" data-month="'+n+'">'+h+"</div>"},p.animating=!1,p.updateCurrentMonthYear=function(e){"undefined"==typeof e?(p.currentMonth=parseInt(p.months.eq(1).attr("data-month"),10),p.currentYear=parseInt(p.months.eq(1).attr("data-year"),10)):(p.currentMonth=parseInt(p.months.eq("next"===e?p.months.length-1:0).attr("data-month"),10),p.currentYear=parseInt(p.months.eq("next"===e?p.months.length-1:0).attr("data-year"),10)),p.container.find(".current-month-value").text(p.params.monthNames[p.currentMonth]),p.container.find(".current-year-value").text(p.currentYear)},p.onMonthChangeStart=function(e){p.updateCurrentMonthYear(e),p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");var a="next"===e?p.months.length-1:0;p.months.eq(a).addClass("picker-calendar-month-current"),p.months.eq("next"===e?a-1:a+1).addClass("next"===e?"picker-calendar-month-prev":"picker-calendar-month-next"),p.params.onMonthYearChangeStart&&p.params.onMonthYearChangeStart(p,p.currentYear,p.currentMonth)},p.onMonthChangeEnd=function(e,a){p.animating=!1;var t,n,r;p.wrapper.find(".picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)").remove(),"undefined"==typeof e&&(e="next",a=!0),a?(p.wrapper.find(".picker-calendar-month-next, .picker-calendar-month-prev").remove(),n=p.monthHTML(new Date(p.currentYear,p.currentMonth),"prev"),t=p.monthHTML(new Date(p.currentYear,p.currentMonth),"next")):r=p.monthHTML(new Date(p.currentYear,p.currentMonth),e),("next"===e||a)&&p.wrapper.append(r||t),("prev"===e||a)&&p.wrapper.prepend(r||n),p.months=p.wrapper.find(".picker-calendar-month"),p.setMonthsTranslate(p.monthsTranslate),p.params.onMonthAdd&&p.params.onMonthAdd(p,"next"===e?p.months.eq(p.months.length-1)[0]:p.months.eq(0)[0]),p.params.onMonthYearChangeEnd&&p.params.onMonthYearChangeEnd(p,p.currentYear,p.currentMonth)},p.setMonthsTranslate=function(e){e=e||p.monthsTranslate||0,"undefined"==typeof p.monthsTranslate&&(p.monthsTranslate=e),p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");var a=100*-(e+1)*f,t=100*-e*f,n=100*-(e-1)*f;p.months.eq(0).transform("translate3d("+(p.isH?a:0)+"%, "+(p.isH?0:a)+"%, 0)").addClass("picker-calendar-month-prev"),p.months.eq(1).transform("translate3d("+(p.isH?t:0)+"%, "+(p.isH?0:t)+"%, 0)").addClass("picker-calendar-month-current"),p.months.eq(2).transform("translate3d("+(p.isH?n:0)+"%, "+(p.isH?0:n)+"%, 0)").addClass("picker-calendar-month-next")},p.nextMonth=function(e){("undefined"==typeof e||"object"==typeof e)&&(e="",p.params.animate||(e=0));var a=parseInt(p.months.eq(p.months.length-1).attr("data-month"),10),t=parseInt(p.months.eq(p.months.length-1).attr("data-year"),10),n=new Date(t,a),r=n.getTime(),o=p.animating?!1:!0;if(p.params.maxDate&&r>new Date(p.params.maxDate).getTime())return p.resetMonth();if(p.monthsTranslate--,a===p.currentMonth){var i=100*-p.monthsTranslate*f,l=s(p.monthHTML(r,"next")).transform("translate3d("+(p.isH?i:0)+"%, "+(p.isH?0:i)+"%, 0)").addClass("picker-calendar-month-next");p.wrapper.append(l[0]),p.months=p.wrapper.find(".picker-calendar-month"),p.params.onMonthAdd&&p.params.onMonthAdd(p,p.months.eq(p.months.length-1)[0])}p.animating=!0,p.onMonthChangeStart("next");var d=100*p.monthsTranslate*f;p.wrapper.transition(e).transform("translate3d("+(p.isH?d:0)+"%, "+(p.isH?0:d)+"%, 0)"),o&&p.wrapper.transitionEnd(function(){p.onMonthChangeEnd("next")}),p.params.animate||p.onMonthChangeEnd("next")},p.prevMonth=function(e){("undefined"==typeof e||"object"==typeof e)&&(e="",p.params.animate||(e=0));var a=parseInt(p.months.eq(0).attr("data-month"),10),t=parseInt(p.months.eq(0).attr("data-year"),10),n=new Date(t,a+1,-1),r=n.getTime(),o=p.animating?!1:!0;if(p.params.minDate&&r<new Date(p.params.minDate).getTime())return p.resetMonth();if(p.monthsTranslate++,a===p.currentMonth){var i=100*-p.monthsTranslate*f,l=s(p.monthHTML(r,"prev")).transform("translate3d("+(p.isH?i:0)+"%, "+(p.isH?0:i)+"%, 0)").addClass("picker-calendar-month-prev");p.wrapper.prepend(l[0]),p.months=p.wrapper.find(".picker-calendar-month"),p.params.onMonthAdd&&p.params.onMonthAdd(p,p.months.eq(0)[0])}p.animating=!0,p.onMonthChangeStart("prev");var d=100*p.monthsTranslate*f;p.wrapper.transition(e).transform("translate3d("+(p.isH?d:0)+"%, "+(p.isH?0:d)+"%, 0)"),o&&p.wrapper.transitionEnd(function(){p.onMonthChangeEnd("prev")}),p.params.animate||p.onMonthChangeEnd("prev")},p.resetMonth=function(e){"undefined"==typeof e&&(e="");var a=100*p.monthsTranslate*f;p.wrapper.transition(e).transform("translate3d("+(p.isH?a:0)+"%, "+(p.isH?0:a)+"%, 0)")},p.setYearMonth=function(e,a,t){"undefined"==typeof e&&(e=p.currentYear),"undefined"==typeof a&&(a=p.currentMonth),("undefined"==typeof t||"object"==typeof t)&&(t="",p.params.animate||(t=0));var n=new Date(e,a).getTime();if(p.params.maxDate&&n>new Date(p.params.maxDate).getTime())return!1;if(p.params.minDate&&n<new Date(p.params.minDate).getTime())return!1;var r,o=new Date(p.currentYear,p.currentMonth).getTime(),i=p.monthHTML(new Date(e,a));p.monthsTranslate=p.monthsTranslate||0;var s,l,d=p.monthsTranslate,c=p.animating?!1:!0;n>o?(p.monthsTranslate--,r="next",p.animating||p.months.eq(p.months.length-1).remove(),p.wrapper.append(i),p.months=p.wrapper.find(".picker-calendar-month"),s=100*-(d-1)*f,p.months.eq(p.months.length-1).transform("translate3d("+(p.isH?s:0)+"%, "+(p.isH?0:s)+"%, 0)").addClass("picker-calendar-month-next")):(p.monthsTranslate++,r="prev",p.animating||p.months.eq(0).remove(),p.wrapper.prepend(i),p.months=p.wrapper.find(".picker-calendar-month"),s=100*-(d+1)*f,p.months.eq(0).transform("translate3d("+(p.isH?s:0)+"%, "+(p.isH?0:s)+"%, 0)").addClass("picker-calendar-month-prev")),p.params.onMonthAdd&&p.params.onMonthAdd(p,"next"===r?p.months.eq(p.months.length-1)[0]:p.months.eq(0)[0]),p.animating=!0,p.onMonthChangeStart(r),l=100*p.monthsTranslate*f,p.wrapper.transition(t).transform("translate3d("+(p.isH?l:0)+"%, "+(p.isH?0:l)+"%, 0)"),c&&p.wrapper.transitionEnd(function(){p.onMonthChangeEnd(r,!0)}),p.params.animate||p.onMonthChangeEnd(r)},p.nextYear=function(){p.setYearMonth(p.currentYear+1)},p.prevYear=function(){p.setYearMonth(p.currentYear-1)},p.layout=function(){var e,a="",t="",n=p.value&&p.value.length?p.value[0]:(new Date).setHours(0,0,0,0),r=p.monthHTML(n,"prev"),o=p.monthHTML(n),i=p.monthHTML(n,"next"),s='<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">'+(r+o+i)+"</div></div>",l="";if(p.params.weekHeader){for(e=0;7>e;e++){var d=e+p.params.firstDay>6?e-7+p.params.firstDay:e+p.params.firstDay,c=p.params.dayNamesShort[d];l+='<div class="picker-calendar-week-day '+(p.params.weekendDays.indexOf(d)>=0?"picker-calendar-week-day-weekend":"")+'"> '+c+"</div>"}l='<div class="picker-calendar-week-days">'+l+"</div>"}t="picker-modal picker-calendar "+(p.params.cssClass||"");var f=p.params.toolbar?p.params.toolbarTemplate.replace(/{{closeText}}/g,p.params.toolbarCloseText):"";p.params.toolbar&&(f=p.params.toolbarTemplate.replace(/{{closeText}}/g,p.params.toolbarCloseText).replace(/{{monthPicker}}/g,p.params.monthPicker?p.params.monthPickerTemplate:"").replace(/{{yearPicker}}/g,p.params.yearPicker?p.params.yearPickerTemplate:"")),a='<div class="'+t+'">'+f+'<div class="picker-modal-inner">'+l+s+"</div></div>",p.pickerHTML=a},p.params.input&&(p.input=s(p.params.input),p.params.inputReadOnly&&p.input.prop("readOnly",!0),p.inline||p.input.on("click",r),p.params.inputReadOnly&&p.input.on("focus mousedown",function(e){e.preventDefault()})),p.inline||s("html").on("click",i),p.opened=!1,p.open=function(){var e=a(),t=!1;p.opened||(p.value||p.params.value&&(p.value=p.params.value,t=!0),p.layout(),e?(p.pickerHTML='<div class="popover popover-picker-calendar"><div class="popover-inner">'+p.pickerHTML+"</div></div>",p.popover=o.popover(p.pickerHTML,p.params.input,!0),p.container=s(p.popover).find(".picker-modal"),s(p.popover).on("close",function(){l()})):p.inline?(p.container=s(p.pickerHTML),p.container.addClass("picker-modal-inline"),s(p.params.container).append(p.container)):(p.container=s(o.pickerModal(p.pickerHTML)),s(p.container).on("close",function(){l()})),p.container[0].f7Calendar=p,p.wrapper=p.container.find(".picker-calendar-months-wrapper"),p.months=p.wrapper.find(".picker-calendar-month"),p.updateCurrentMonthYear(),p.monthsTranslate=0,p.setMonthsTranslate(),p.initCalendarEvents(),t&&p.updateValue()),p.opened=!0,p.initialized=!0,p.params.onMonthAdd&&p.months.each(function(){p.params.onMonthAdd(p,this)}),p.params.onOpen&&p.params.onOpen(p)},p.close=function(){return p.opened&&!p.inline?t()?void o.closeModal(p.popover):void o.closeModal(p.container):void 0},p.destroy=function(){p.close(),p.params.input&&p.input.off("click focus",r),s("html").off("click",i)},p.inline&&p.open(),p};o.calendar=function(e){return new g(e)};var v;o.addNotification=function(e){if(e){"undefined"==typeof e.media&&(e.media=o.params.notificationMedia),"undefined"==typeof e.title&&(e.title=o.params.notificationTitle),"undefined"==typeof e.subtitle&&(e.subtitle=o.params.notificationSubtitle),"undefined"==typeof e.closeIcon&&(e.closeIcon=o.params.notificationCloseIcon),"undefined"==typeof e.hold&&(e.hold=o.params.notificationHold),"undefined"==typeof e.closeOnClick&&(e.closeOnClick=o.params.notificationCloseOnClick),v||(v=document.createElement("div"));var a=s(".notifications");0===a.length&&(s("body").append('<div class="notifications list-block media-list"><ul></ul></div>'),a=s(".notifications"));var t,n=a.children("ul");t=e.custom?"<li>"+e.custom+"</li>":'<li class="notification-item notification-hidden"><div class="item-content">'+(e.media?'<div class="item-media">'+e.media+"</div>":"")+'<div class="item-inner"><div class="item-title-row">'+(e.title?'<div class="item-title">'+e.title+"</div>":"")+(e.closeIcon?'<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>':"")+"</div>"+(e.subtitle?'<div class="item-subtitle">'+e.subtitle+"</div>":"")+(e.message?'<div class="item-text">'+e.message+"</div>":"")+"</div></div></li>",v.innerHTML=t;var r=s(v).children();r.on("click",function(a){var t=!1;s(a.target).is(".close-notification")||s(a.target).parents(".close-notification").length>0?t=!0:(e.onClick&&e.onClick(a,r[0]),e.closeOnClick&&(t=!0)),t&&o.closeNotification(r[0])}),e.onClose&&r.data("f7NotificationOnClose",function(){e.onClose(r[0])}),e.additionalClass&&r.addClass(e.additionalClass),e.hold&&setTimeout(function(){r.length>0&&o.closeNotification(r[0])},e.hold),n.prepend(r[0]),a.show();var i=r.outerHeight();r.css("marginTop",-i+"px"),r.transition(0);{r[0].clientLeft}return r.transition(""),r.css("marginTop","0px"),a.transform("translate3d(0, 0,0)"),r.removeClass("notification-hidden"),r[0]}},o.closeNotification=function(e){if(e=s(e),0!==e.length&&!e.hasClass("notification-item-removing")){var a=s(".notifications"),t=e.outerHeight();e.css("height",t+"px").transition(0);{e[0].clientLeft}e.css("height","0px").transition("").addClass("notification-item-removing"),e.data("f7NotificationOnClose")&&e.data("f7NotificationOnClose")(),0===a.find(".notification-item:not(.notification-item-removing)").length&&a.transform(""),e.addClass("notification-hidden").transitionEnd(function(){e.remove(),0===a.find(".notification-item").length&&a.hide()})}},o.initTemplate7Templates=function(){window.Template7&&(Template7.templates=Template7.templates||o.params.templates||{},Template7.data=Template7.data||o.params.template7Data||{},Template7.cache=Template7.cache||{},o.templates=Template7.templates,o.template7Data=Template7.data,o.template7Cache=Template7.cache,o.params.precompileTemplates&&s('script[type="text/template7"]').each(function(){var e=s(this).attr("id");e&&(Template7.templates[e]=Template7.compile(s(this).html()))}))};var w=[];return o.initPlugins=function(){for(var e in o.plugins){var a=o.plugins[e](o,o.params[e]);a&&w.push(a)}},o.pluginHook=function(e){for(var a=0;a<w.length;a++)w[a].hooks&&e in w[a].hooks&&w[a].hooks[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},o.pluginPrevent=function(e){for(var a=!1,t=0;t<w.length;t++)w[t].prevents&&e in w[t].prevents&&w[t].prevents[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])&&(a=!0);return a},o.pluginProcess=function(e,a){for(var t=a,n=0;n<w.length;n++)w[n].preprocess&&process in w[n].preprocess&&(t=w[n].preprocess[process](a,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]));return t},o.init=function(){o.initTemplate7Templates&&o.initTemplate7Templates(),o.initPlugins&&o.initPlugins(),o.getDeviceInfo&&o.getDeviceInfo(),o.initFastClicks&&o.params.fastClicks&&o.initFastClicks(),o.initClickEvents&&o.initClickEvents(),s(".page:not(.cached)").each(function(){o.initPageWithCallback(this)}),o.initResize&&o.initResize(),o.initPushState&&o.params.pushState&&o.initPushState(),o.initSwipeout&&o.params.swipeout&&o.initSwipeout(),o.initSortable&&o.params.sortable&&o.initSortable(),o.initSwipePanels&&(o.params.swipePanel||o.params.swipePanelOnlyClose)&&o.initSwipePanels(),o.params.onAppInit&&o.params.onAppInit(),o.pluginHook("appInit")},o.params.init&&o.init(),o};var e=function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var n=[],r=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var o,i,s=a.trim();if(s.indexOf("<")>=0&&s.indexOf(">")>=0){var l="div";for(0===s.indexOf("<li")&&(l="ul"),0===s.indexOf("<tr")&&(l="tbody"),(0===s.indexOf("<td")||0===s.indexOf("<th"))&&(l="tr"),0===s.indexOf("<tbody")&&(l="table"),0===s.indexOf("<option")&&(l="select"),i=document.createElement(l),i.innerHTML=a,r=0;r<i.childNodes.length;r++)n.push(i.childNodes[r])}else for(o=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],r=0;r<o.length;r++)o[r]&&n.push(o[r])}else if(a.nodeType||a===window||a===document)n.push(a);else if(a.length>0&&a[0].nodeType)for(r=0;r<a.length;r++)n.push(a[r]);return new e(n)};e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var n=0;n<this.length;n++)"undefined"!=typeof this[n].classList&&this[n].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var n=0;n<this.length;n++)"undefined"!=typeof this[n].classList&&this[n].classList.remove(a[t]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var n=0;n<this.length;n++)"undefined"!=typeof this[n].classList&&this[n].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var n in e)this[t][n]=e[n],this[t].setAttribute(n,e[n]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e)},prop:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0][e]:void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t][e]=a;else for(var n in e)this[t][n]=e[n];return this},data:function(e,a){if("undefined"==typeof a){if(this[0]){var t=this[0].getAttribute("data-"+e);return t?t:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}return void 0}for(var n=0;n<this.length;n++){var r=this[n];r.dom7ElementDataStorage||(r.dom7ElementDataStorage={}),r.dom7ElementDataStorage[e]=a}return this},val:function(e){if("undefined"==typeof e)return this[0]?this[0].value:void 0;for(var a=0;a<this.length;a++)this[a].value=e;return this},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,n,r){function o(e){var r=e.target;if(a(r).is(t))n.call(r,e);else for(var o=a(r).parents(),i=0;i<o.length;i++)a(o[i]).is(t)&&n.call(o[i],e)}var i,s,l=e.split(" ");for(i=0;i<this.length;i++)if("function"==typeof t||t===!1)for("function"==typeof t&&(n=arguments[1],r=arguments[2]||!1),s=0;s<l.length;s++)this[i].addEventListener(l[s],n,r);else for(s=0;s<l.length;s++)this[i].dom7LiveListeners||(this[i].dom7LiveListeners=[]),this[i].dom7LiveListeners.push({listener:n,liveListener:o}),this[i].addEventListener(l[s],o,r);return this},off:function(e,a,t,n){for(var r=e.split(" "),o=0;o<r.length;o++)for(var i=0;i<this.length;i++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],n=arguments[2]||!1),this[i].removeEventListener(r[o],t,n);else if(this[i].dom7LiveListeners)for(var s=0;s<this[i].dom7LiveListeners.length;s++)this[i].dom7LiveListeners[s].listener===t&&this[i].removeEventListener(r[o],this[i].dom7LiveListeners[s].liveListener,n);return this},once:function(e,a,t,n){function r(i){t(i),o.off(e,a,r,n)}var o=this;"function"==typeof a&&(a=!1,t=arguments[1],n=arguments[2]),o.on(e,a,r,n)},trigger:function(e,a){for(var t=0;t<this.length;t++){var n;try{n=new CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(r){n=document.createEvent("Event"),n.initEvent(e,!0,!0),n.detail=a}this[t].dispatchEvent(n)}return this},transitionEnd:function(e){function a(o){if(o.target===this)for(e.call(this,o),t=0;t<n.length;t++)r.off(n[t],a)}var t,n=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(t=0;t<n.length;t++)r.on(n[t],a);return this},animationEnd:function(e){function a(o){for(e(o),t=0;t<n.length;t++)r.off(n[t],a)}var t,n=["webkitAnimationEnd","OAnimationEnd","MSAnimationEnd","animationend"],r=this;if(e)for(t=0;t<n.length;t++)r.on(n[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,n=e.clientTop||t.clientTop||0,r=e.clientLeft||t.clientLeft||0,o=window.pageYOffset||e.scrollTop,i=window.pageXOffset||e.scrollLeft;return{top:a.top+o-n,left:a.left+i-r}}return null},hide:function(){for(var e=0;e<this.length;e++)this[e].style.display="none";return this},show:function(){for(var e=0;e<this.length;e++)this[e].style.display="block";return this},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var n in e)this[t].style[n]=e[n];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},text:function(e){if("undefined"==typeof e)return this[0]?this[0].textContent.trim():null;for(var a=0;a<this.length;a++)this[a].textContent=e},is:function(t){if(!this[0])return!1;var n,r;if("string"==typeof t){var o=this[0];if(o===document)return t===document;if(o===window)return t===window;if(o.matches)return o.matches(t);if(o.webkitMatchesSelector)return o.webkitMatchesSelector(t);if(o.mozMatchesSelector)return o.mozMatchesSelector(t);if(o.msMatchesSelector)return o.msMatchesSelector(t);for(n=a(t),r=0;r<n.length;r++)if(n[r]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(n=t.nodeType?[t]:t,r=0;r<n.length;r++)if(n[r]===this[0])return!0;return!1}return!1},indexOf:function(e){for(var a=0;a<this.length;a++)if(this[a]===e)return a},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}return void 0},eq:function(a){if("undefined"==typeof a)return this;var t,n=this.length;return a>n-1?new e([]):0>a?(t=n+a,new e(0>t?[]:[this[t]])):new e([this[a]])},append:function(a){var t,n;for(t=0;t<this.length;t++)if("string"==typeof a){var r=document.createElement("div");for(r.innerHTML=a;r.firstChild;)this[t].appendChild(r.firstChild)}else if(a instanceof e)for(n=0;n<a.length;n++)this[t].appendChild(a[n]);else this[t].appendChild(a);return this},prepend:function(a){var t,n;for(t=0;t<this.length;t++)if("string"==typeof a){var r=document.createElement("div");for(r.innerHTML=a,n=r.childNodes.length-1;n>=0;n--)this[t].insertBefore(r.childNodes[n],this[t].childNodes[0])}else if(a instanceof e)for(n=0;n<a.length;n++)this[t].insertBefore(a[n],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),n=0;n<this.length;n++)if(1===t.length)t[0].parentNode.insertBefore(this[n],t[0]);else if(t.length>1)for(var r=0;r<t.length;r++)t[r].parentNode.insertBefore(this[n].cloneNode(!0),t[r])},insertAfter:function(e){for(var t=a(e),n=0;n<this.length;n++)if(1===t.length)t[0].parentNode.insertBefore(this[n],t[0].nextSibling);else if(t.length>1)for(var r=0;r<t.length;r++)t[r].parentNode.insertBefore(this[n].cloneNode(!0),t[r].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var n=[],r=this[0];if(!r)return new e([]);for(;r.nextElementSibling;){var o=r.nextElementSibling;t?a(o).is(t)&&n.push(o):n.push(o),r=o}return new e(n)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])
},prevAll:function(t){var n=[],r=this[0];if(!r)return new e([]);for(;r.previousElementSibling;){var o=r.previousElementSibling;t?a(o).is(t)&&n.push(o):n.push(o),r=o}return new e(n)},parent:function(e){for(var t=[],n=0;n<this.length;n++)e?a(this[n].parentNode).is(e)&&t.push(this[n].parentNode):t.push(this[n].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],n=0;n<this.length;n++)for(var r=this[n].parentNode;r;)e?a(r).is(e)&&t.push(r):t.push(r),r=r.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],n=0;n<this.length;n++)for(var r=this[n].querySelectorAll(a),o=0;o<r.length;o++)t.push(r[o]);return new e(t)},children:function(t){for(var n=[],r=0;r<this.length;r++)for(var o=this[r].childNodes,i=0;i<o.length;i++)t?1===o[i].nodeType&&a(o[i]).is(t)&&n.push(o[i]):1===o[i].nodeType&&n.push(o[i]);return new e(a.unique(n))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},detach:function(){return this.remove()},add:function(){var e,t,n=this;for(e=0;e<arguments.length;e++){var r=a(arguments[e]);for(t=0;t<r.length;t++)n[n.length]=r[t],n.length++}return n}},function(){function t(t){e.prototype[t]=function(e){var n;if("undefined"==typeof e){for(n=0;n<this.length;n++)r.indexOf(t)<0&&(t in this[n]?this[n][t]():a(this[n]).trigger(t));return this}return this.on(t,e)}}for(var n="click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll".split(" "),r="resize scroll".split(" "),o=0;o<n.length;o++)t(n[o])}();var t={};a.ajaxSetup=function(e){e.type&&(e.method=e.type);for(var a in e)t[a]=e[a]};var n=0;return a.ajax=function(e){function r(n,r,o){var i=arguments;n&&a(document).trigger(n,r),o&&(o in t&&t[o](i[3],i[4],i[5],i[6]),e[o]&&e[o](i[3],i[4],i[5],i[6]))}var o={method:"GET",data:!1,async:!0,cache:!0,user:"",password:"",headers:{},xhrFields:{},statusCode:{},processData:!0,dataType:"text",contentType:"application/x-www-form-urlencoded",timeout:0},i=["beforeSend","error","complete","success","statusCode"];e.type&&(e.method=e.type);for(var s in t)i.indexOf(s)<0&&(o[s]=t[s]);for(var l in o)l in e||(e[l]=o[l]);e.url||(e.url=window.location.toString());var p=e.method.toUpperCase();if(("GET"===p||"HEAD"===p)&&e.data){var d;d="string"==typeof e.data?e.data.indexOf("?")>=0?e.data.split("?")[1]:e.data:a.serializeObject(e.data),e.url+=e.url.indexOf("?")>=0?"&"+d:"?"+d}if("json"===e.dataType&&e.url.indexOf("callback=")>=0){var c,f,u="f7jsonp_"+Date.now()+n++,h=e.url.split("callback=");if(h[1].indexOf("&")>=0){var m=h[1].split("&").filter(function(e){return e.indexOf("=")>0}).join("&");c=h[0]+"callback="+u+(m.length>0?"&"+m:"")}else c=h[0]+"callback="+u;var g=document.createElement("script");return g.type="text/javascript",g.onerror=function(){clearTimeout(f),r(void 0,void 0,"error",null,"scripterror")},g.src=c,window[u]=function(e){clearTimeout(f),r(void 0,void 0,"success",e),g.parentNode.removeChild(g),g=null,delete window[u]},document.querySelector("head").appendChild(g),void(e.timeout>0&&(f=setTimeout(function(){g.parentNode.removeChild(g),g=null,r(void 0,void 0,"error",null,"timeout")},e.timeout)))}("GET"===p||"HEAD"===p)&&e.cache===!1&&(e.url+=e.url.indexOf("?")>=0?"&_nocache="+Date.now():"?_nocache="+Date.now());var v=new XMLHttpRequest;v.requestUrl=e.url,v.open(p,e.url,e.async,e.user,e.password);var w=null;if(("POST"===p||"PUT"===p)&&e.data)if(e.processData){var b=[ArrayBuffer,Blob,Document,FormData];if(b.indexOf(e.data.constructor)>=0)w=e.data;else{var C="---------------------------"+Date.now().toString(16);"multipart/form-data"===e.contentType?v.setRequestHeader("Content-Type","multipart/form-data; boundary="+C):v.setRequestHeader("Content-Type",e.contentType),w="";var y=a.serializeObject(e.data);if("multipart/form-data"===e.contentType){C="---------------------------"+Date.now().toString(16),y=y.split("&");for(var x=[],T=0;T<y.length;T++)x.push('Content-Disposition: form-data; name="'+y[T].split("=")[0]+'"\r\n\r\n'+y[T].split("=")[1]+"\r\n");w="--"+C+"\r\n"+x.join("--"+C+"\r\n")+"--"+C+"--\r\n"}else w="application/x-www-form-urlencoded"===e.contentType?y:y.replace(/&/g,"\r\n")}}else w=e.data;if(e.headers)for(var k in e.headers)v.setRequestHeader(k,e.headers[k]);if("undefined"==typeof e.crossDomain&&(e.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(e.url)&&RegExp.$2!==window.location.host),e.crossDomain||v.setRequestHeader("X-Requested-With","XMLHttpRequest"),e.xhrFields)for(var S in e.xhrFields)v[S]=e.xhrFields[S];var P;return v.onload=function(){if(P&&clearTimeout(P),200===v.status||0===v.status){var a;if("json"===e.dataType)try{a=JSON.parse(v.responseText),r("ajaxSuccess",{xhr:v},"success",a,v.status,v)}catch(n){r("ajaxError",{xhr:v,parseerror:!0},"error",v,"parseerror")}else r("ajaxSuccess",{xhr:v},"success",v.responseText,v.status,v)}else r("ajaxError",{xhr:v},"error",v,v.status);e.statusCode&&(t.statusCode&&t.statusCode[v.status]&&t.statusCode[v.status](v),e.statusCode[v.status]&&e.statusCode[v.status](v)),r("ajaxComplete",{xhr:v},"complete",v,v.status)},v.onerror=function(){P&&clearTimeout(P),r("ajaxError",{xhr:v},"error",v,v.status)},r("ajaxStart",{xhr:v},"start",v),r(void 0,void 0,"beforeSend",v),v.send(w),e.timeout>0&&(P=setTimeout(function(){v.abort(),r("ajaxError",{xhr:v,timeout:!0},"error",v,"timeout"),r("ajaxComplete",{xhr:v,timeout:!0},"complete",v,"timeout")},e.timeout)),v},function(){function e(e){a[e]=function(t,n,r){return a.ajax({url:t,method:"post"===e?"POST":"GET",data:"function"==typeof n?void 0:n,success:"function"==typeof n?n:r,dataType:"getJSON"===e?"json":void 0})}}for(var t="get post getJSON".split(" "),n=0;n<t.length;n++)e(t[n])}(),a.parseUrlQuery=function(e){var a,t,n,r={};if(!(e.indexOf("?")>=0))return r;for(e=e.split("?")[1],t=e.split("&"),a=0;a<t.length;a++)n=t[a].split("="),r[n[0]]=n[1];return r},a.isArray=function(e){return"[object Array]"===Object.prototype.toString.apply(e)?!0:!1},a.unique=function(e){for(var a=[],t=0;t<e.length;t++)-1===a.indexOf(e[t])&&a.push(e[t]);return a},a.trim=function(e){return e.trim()},a.serializeObject=function(e){if("string"==typeof e)return e;var t=[],n="&";for(var r in e)if(a.isArray(e[r])){for(var o=[],i=0;i<e[r].length;i++)o.push(r+"="+e[r][i]);t.push(o.join(n))}else t.push(r+"="+e[r]);return t.join(n)},a.getTranslate=function(e,a){var t,n,r,o;return"undefined"==typeof a&&(a="x"),r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?o=new WebKitCSSMatrix("none"===r.webkitTransform?"":r.webkitTransform):(o=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=o.toString().split(",")),"x"===a&&(n=window.WebKitCSSMatrix?o.m41:parseFloat(16===t.length?t[12]:t[4])),"y"===a&&(n=window.WebKitCSSMatrix?o.m42:parseFloat(16===t.length?t[13]:t[5])),n||0},a.requestAnimationFrame=function(e){return window.requestAnimationFrame?window.requestAnimationFrame(e):window.webkitRequestAnimationFrame?window.webkitRequestAnimationFrame(e):window.mozRequestAnimationFrame?window.mozRequestAnimationFrame(e):window.setTimeout(e,1e3/60)},a.cancelAnimationFrame=function(e){return window.cancelAnimationFrame?window.cancelAnimationFrame(e):window.webkitCancelAnimationFrame?window.webkitCancelAnimationFrame(e):window.mozCancelAnimationFrame?window.mozCancelAnimationFrame(e):window.clearTimeout(e)},a.supportTouch=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch),a.fn=e.prototype,a.fn.scrollTo=function(e,t,n,r){return this.each(function(){function o(e){void 0===e&&(e=(new Date).getTime()),null===v&&(v=e);var t,l=Math.max(Math.min((e-v)/n,1),0),p="linear"===r?l:.5-Math.cos(l*Math.PI)/2;m&&(f=i+p*(d-i)),g&&(u=s+p*(c-s)),m&&d>i&&f>=d&&(h.scrollTop=d,t=!0),m&&i>d&&d>=f&&(h.scrollTop=d,t=!0),g&&c>s&&u>=c&&(h.scrollLeft=c,t=!0),g&&s>c&&c>=u&&(h.scrollLeft=c,t=!0),t||(m&&(h.scrollTop=f),g&&(h.scrollLeft=u),a.requestAnimationFrame(o))}var i,s,l,p,d,c,f,u,h=this,m=t>0||0===t,g=e>0||0===e;if("undefined"==typeof r&&(r="swing"),m&&(i=h.scrollTop,n||(h.scrollTop=t)),g&&(s=h.scrollLeft,n||(h.scrollLeft=e)),n){m&&(l=h.scrollHeight-h.offsetHeight,d=Math.max(Math.min(t,l),0)),g&&(p=h.scrollWidth-h.offsetWidth,c=Math.max(Math.min(e,p),0));var v=null;m&&d===i&&(m=!1),g&&c===s&&(g=!1),a.requestAnimationFrame(o)}})},a.fn.scrollTop=function(e,a,t){var n=this;return"undefined"==typeof e?n.length>0?n[0].scrollTop:null:n.scrollTo(void 0,e,a,t)},a.fn.scrollLeft=function(e,a,t){var n=this;return"undefined"==typeof e?n.length>0?n[0].scrollLeft:null:n.scrollTo(e,void 0,a,t)},a}();Framework7.$=e;window.Dom7=e,Framework7.prototype.support=function(){var e={touch:!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)};return e}(),Framework7.prototype.device=function(){var a={},t=navigator.userAgent,n=e,r=t.match(/(Android);?[\s\/]+([\d.]+)?/),o=t.match(/(iPad).*OS\s([\d_]+)/),i=t.match(/(iPod)(.*OS\s([\d_]+))?/),s=!o&&t.match(/(iPhone\sOS)\s([\d_]+)/);if(a.ios=a.android=a.iphone=a.ipad=a.androidChrome=!1,r&&(a.os="android",a.osVersion=r[2],a.android=!0,a.androidChrome=t.toLowerCase().indexOf("chrome")>=0),(o||s||i)&&(a.os="ios",a.ios=!0),s&&!i&&(a.osVersion=s[2].replace(/_/g,"."),a.iphone=!0),o&&(a.osVersion=o[2].replace(/_/g,"."),a.ipad=!0),i&&(a.osVersion=i[3]?i[3].replace(/_/g,"."):null,a.iphone=!0),a.ios&&a.osVersion&&t.indexOf("Version/")>=0&&"10"===a.osVersion.split(".")[0]&&(a.osVersion=t.toLowerCase().split("version/")[1].split(" ")[0]),a.webView=(s||o||i)&&t.match(/.*AppleWebKit(?!.*Safari)/i),a.os&&"ios"===a.os){var l=a.osVersion.split(".");a.minimalUi=!a.webView&&(i||s)&&(1*l[0]===7?1*l[1]>=1:1*l[0]>7)&&n('meta[name="viewport"]').length>0&&n('meta[name="viewport"]').attr("content").indexOf("minimal-ui")>=0}var p=n(window).width(),d=n(window).height();a.statusBar=!1,a.statusBar=a.webView&&p*d===screen.width*screen.height?!0:!1;var c=[];if(a.pixelRatio=window.devicePixelRatio||1,c.push("pixel-ratio-"+Math.floor(a.pixelRatio)),a.pixelRatio>=2&&c.push("retina"),a.os&&(c.push(a.os,a.os+"-"+a.osVersion.split(".")[0],a.os+"-"+a.osVersion.replace(/\./g,"-")),"ios"===a.os))for(var f=parseInt(a.osVersion.split(".")[0],10),u=f-1;u>=6;u--)c.push("ios-gt-"+u);return a.statusBar?c.push("with-statusbar-overlay"):n("html").removeClass("with-statusbar-overlay"),c.length>0&&n("html").addClass(c.join(" ")),a}(),Framework7.prototype.plugins={},window.Template7=function(){function e(e){return"[object Array]"===Object.prototype.toString.apply(e)}function a(e){return"function"==typeof e}function t(e){var a,t,n,r=e.replace(/[{}#}]/g,"").split(" "),o=[];for(t=0;t<r.length;t++){var i=r[t];if(0===t)o.push(i);else if(0===i.indexOf('"'))if(2===i.match(/"/g).length)o.push(i);else{for(a=0,n=t+1;n<r.length;n++)if(i+=" "+r[n],r[n].indexOf('"')>=0){a=n,o.push(i);break}a&&(t=a)}else if(i.indexOf("=")>0){var s=i.split("="),l=s[0],p=s[1];if(2!==p.match(/"/g).length){for(a=0,n=t+1;n<r.length;n++)if(p+=" "+r[n],r[n].indexOf('"')>=0){a=n;break}a&&(t=a)}var d=[l,p.replace(/"/g,"")];o.push(d)}else o.push(i)}return o}function n(a){var n,r,o=[];if(!a)return[];var i=a.split(/({{[^{^}]*}})/);for(n=0;n<i.length;n++){var s=i[n];if(""!==s)if(s.indexOf("{{")<0)o.push({type:"plain",content:s});else{if(s.indexOf("{/")>=0)continue;if(s.indexOf("{#")<0&&s.indexOf(" ")<0&&s.indexOf("else")<0){o.push({type:"variable",contextName:s.replace(/[{}]/g,"")});continue}var l=t(s),p=l[0],d=[],c={};for(r=1;r<l.length;r++){var f=l[r];e(f)?c[f[0]]="false"===f[1]?!1:f[1]:d.push(f)}if(s.indexOf("{#")>=0){var u,h="",m="",g=0,v=!1,w=!1,b=0;for(r=n+1;r<i.length;r++)if(i[r].indexOf("{{#")>=0&&b++,i[r].indexOf("{{/")>=0&&b--,i[r].indexOf("{{#"+p)>=0)h+=i[r],w&&(m+=i[r]),g++;else if(i[r].indexOf("{{/"+p)>=0){if(!(g>0)){u=r,v=!0;break}g--,h+=i[r],w&&(m+=i[r])}else i[r].indexOf("else")>=0&&0===b?w=!0:(w||(h+=i[r]),w&&(m+=i[r]));v&&(u&&(n=u),o.push({type:"helper",helperName:p,contextName:d,content:h,inverseContent:m,hash:c}))}else s.indexOf(" ")>0&&o.push({type:"helper",helperName:p,contextName:d,hash:c})}}return o}var r=function(e){function a(e,a){return e.content?i(e.content,a):function(){return""}}function t(e,a){return e.inverseContent?i(e.inverseContent,a):function(){return""}}function r(e,a){var t;if(e.indexOf("@global")>=0)t="(Template7.global && Template7.global."+e.split("@global.")[1]+")";else if(e.indexOf("@")>=0)t="(data && data."+e.replace("@","")+")";else if(e.indexOf(".")>0)t=0===e.indexOf("this")?e.replace("this",a):a+"."+e;else if(0===e.indexOf("../")){var n=e.split("../").length-1,r=e.split("../")[e.split("../").length-1],o=a.split("_")[1]-n;t="ctx_"+(o>=1?o:1)+"."+r}else t="this"===e?a:a+"."+e;return t}function o(e,a){for(var t=[],n=0;n<e.length;n++)t.push(0===e[n].indexOf('"')?e[n]:r(e[n],a));return t.join(", ")}function i(e,i){if(i=i||1,e=e||s.template,"string"!=typeof e)throw new Error("Template7: Template must be a string");var l=n(e);if(0===l.length)return function(){return""};var p="ctx_"+i,d="(function ("+p+", data) {\n";1===i&&(d+="function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n",d+="function isFunction(func){return (typeof func === 'function');}\n",d+='function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),d+="var r = '';\n";var c;for(c=0;c<l.length;c++){var f=l[c];if("plain"!==f.type){var u,h;if("variable"===f.type&&(u=r(f.contextName,p),d+="r += c("+u+", "+p+");"),"helper"===f.type)if(f.helperName in s.helpers)h=o(f.contextName,p),d+="r += (Template7.helpers."+f.helperName+").call("+p+", "+(h&&h+",")+"{hash:"+JSON.stringify(f.hash)+", data: data || {}, fn: "+a(f,i+1)+", inverse: "+t(f,i+1)+"});";else{if(f.contextName.length>0)throw new Error('Template7: Missing helper: "'+f.helperName+'"');u=r(f.helperName,p),d+="if ("+u+") {",d+="if (isArray("+u+")) {",d+="r += (Template7.helpers.each).call("+p+", "+u+", {hash:"+JSON.stringify(f.hash)+", data: data || {}, fn: "+a(f,i+1)+", inverse: "+t(f,i+1)+"});",d+="}else {",d+="r += (Template7.helpers.with).call("+p+", "+u+", {hash:"+JSON.stringify(f.hash)+", data: data || {}, fn: "+a(f,i+1)+", inverse: "+t(f,i+1)+"});",d+="}}"}}else d+="r +='"+f.content.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/'/g,"\\'")+"';"}return d+="\nreturn r;})",eval.call(window,d)}var s=this;s.template=e,s.compile=function(e){return s.compiled||(s.compiled=i(e)),s.compiled}};r.prototype={options:{},helpers:{"if":function(e,t){return a(e)&&(e=e.call(this)),e?t.fn(this,t.data):t.inverse(this,t.data)},unless:function(e,t){return a(e)&&(e=e.call(this)),e?t.inverse(this,t.data):t.fn(this,t.data)},each:function(t,n){var r="",o=0;if(a(t)&&(t=t.call(this)),e(t)){for(n.hash.reverse&&(t=t.reverse()),o=0;o<t.length;o++)r+=n.fn(t[o],{first:0===o,last:o===t.length-1,index:o});n.hash.reverse&&(t=t.reverse())}else for(var i in t)o++,r+=n.fn(t[i],{key:i});return o>0?r:n.inverse(this)},"with":function(e,t){return a(e)&&(e=e.call(this)),t.fn(e)},join:function(e,t){return a(e)&&(e=e.call(this)),e.join(t.hash.delimiter||t.hash.delimeter)}}};var o=function(e,a){if(2===arguments.length){var t=new r(e),n=t.compile()(a);return t=null,n}return new r(e)};return o.registerHelper=function(e,a){r.prototype.helpers[e]=a},o.unregisterHelper=function(e){r.prototype.helpers[e]=void 0,delete r.prototype.helpers[e]},o.compile=function(e,a){var t=new r(e,a);return t.compile()},o.options=r.prototype.options,o.helpers=r.prototype.helpers,o}(),window.Swiper=function(a,t){function n(){return"horizontal"===c.params.direction}function r(e){var a,t,n=function(){"undefined"!=typeof c&&null!==c&&(void 0!==c.imagesLoaded&&c.imagesLoaded++,c.imagesLoaded===c.imagesToLoad.length&&(c.update(),c.params.onImagesReady&&c.params.onImagesReady(c)))};e.complete?n():(t=e.currentSrc||e.getAttribute("src"),t?(a=new Image,a.onload=n,a.onerror=n,a.src=t):n())}function o(){c.autoplayTimeoutId=setTimeout(function(){c.params.loop?(c.fixLoop(),c._slideNext()):c.isEnd?t.autoplayStopOnLast?c.stopAutoplay():c._slideTo(0):c._slideNext()},c.params.autoplay)}function i(e,a){var t=f(e.target);if(!t.is(a))if("string"==typeof a)t=t.parents(a);else if(a.nodeType){var n;return t.parents().each(function(e,t){t===a&&(n=a)}),n?a:void 0}return 0===t.length?void 0:t[0]}function s(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,n=new t(function(e){e.forEach(function(){c.onResize()})});n.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),c.observers.push(n)}var l={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,releaseFormElements:!0,slideToClickedSlide:!1,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,runCallbacksOnInit:!0};t=t||{};for(var p in l)if("undefined"==typeof t[p])t[p]=l[p];else if("object"==typeof t[p])for(var d in l[p])"undefined"==typeof t[p][d]&&(t[p][d]=l[p][d]);var c=this;c.params=t;var f;if(f="undefined"==typeof e?window.Dom7||window.Zepto||window.jQuery:e,f&&(c.container=f(a),0!==c.container.length)){if(c.container.length>1)return void c.container.each(function(){new Swiper(this,t)});c.container[0].swiper=c,c.container.data("swiper",c),c.container.addClass("swiper-container-"+c.params.direction),c.params.freeMode&&c.container.addClass("swiper-container-free-mode"),["cube","coverflow"].indexOf(c.params.effect)>=0&&(c.support.transforms3d?(c.params.watchSlidesProgress=!0,c.container.addClass("swiper-container-3d")):c.params.effect="slide"),"slide"!==c.params.effect&&c.container.addClass("swiper-container-"+c.params.effect),"cube"===c.params.effect&&(c.params.resistanceRatio=0,c.params.slidesPerView=1,c.params.slidesPerColumn=1,c.params.slidesPerGroup=1,c.params.centeredSlides=!1,c.params.spaceBetween=0),"fade"===c.params.effect&&(c.params.watchSlidesProgress=!0,c.params.spaceBetween=0),c.params.grabCursor&&c.support.touch&&(c.params.grabCursor=!1),c.wrapper=c.container.children("."+c.params.wrapperClass),c.params.pagination&&(c.paginationContainer=f(c.params.pagination),c.params.paginationClickable&&c.paginationContainer.addClass("swiper-pagination-clickable")),c.rtl=n()&&("rtl"===c.container[0].dir.toLowerCase()||"rtl"===c.container.css("direction")),c.rtl&&c.container.addClass("swiper-container-rtl"),c.rtl&&(c.wrongRTL="-webkit-box"===c.wrapper.css("display")),c.translate=0,c.progress=0,c.velocity=0,c.lockSwipeToNext=function(){c.params.allowSwipeToNext=!1},c.lockSwipeToPrev=function(){c.params.allowSwipeToPrev=!1},c.lockSwipes=function(){c.params.allowSwipeToNext=c.params.allowSwipeToPrev=!1},c.unlockSwipeToNext=function(){c.params.allowSwipeToNext=!0},c.unlockSwipeToPrev=function(){c.params.allowSwipeToPrev=!0},c.unlockSwipes=function(){c.params.allowSwipeToNext=c.params.allowSwipeToPrev=!0},c.params.slidesPerColumn>1&&c.container.addClass("swiper-container-multirow"),c.params.grabCursor&&(c.container[0].style.cursor="move",c.container[0].style.cursor="-webkit-grab",c.container[0].style.cursor="-moz-grab",c.container[0].style.cursor="grab"),c.imagesToLoad=[],c.imagesLoaded=0,c.preloadImages=function(){c.imagesToLoad=c.container.find("img");for(var e=0;e<c.imagesToLoad.length;e++)r(c.imagesToLoad[e])},c.autoplayTimeoutId=void 0,c.autoplaying=!1,c.autoplayPaused=!1,c.startAutoplay=function(){return"undefined"!=typeof c.autoplayTimeoutId?!1:void(c.params.autoplay&&(c.autoplaying||(c.autoplaying=!0,c.params.onAutoplayStart&&c.params.onAutoplayStart(c),o())))},c.stopAutoplay=function(){c.autoplayTimeoutId&&(c.autoplayTimeoutId&&clearTimeout(c.autoplayTimeoutId),c.autoplaying=!1,c.autoplayTimeoutId=void 0,c.params.onAutoplayStop&&c.params.onAutoplayStop(c))},c.pauseAutoplay=function(e){c.autoplayPaused||(c.autoplayTimeoutId&&clearTimeout(c.autoplayTimeoutId),c.autoplayPaused=!0,0===e?(c.autoplayPaused=!1,o()):c.wrapper.transitionEnd(function(){c.autoplayPaused=!1,o()}))},c.minTranslate=function(){return-c.snapGrid[0]},c.maxTranslate=function(){return-c.snapGrid[c.snapGrid.length-1]},c.updateContainerSize=function(){c.width=c.container[0].clientWidth,c.height=c.container[0].clientHeight,c.size=n()?c.width:c.height},c.updateSlidesSize=function(){c.slides=c.wrapper.children("."+c.params.slideClass),c.snapGrid=[],c.slidesGrid=[],c.slidesSizesGrid=[];var e,a=c.params.spaceBetween,t=0,r=0,o=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*c.size),c.virtualWidth=-a,c.slides.css(c.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var i;c.params.slidesPerColumn>1&&(i=Math.floor(c.slides.length/c.params.slidesPerColumn)===c.slides.length/c.params.slidesPerColumn?c.slides.length:Math.ceil(c.slides.length/c.params.slidesPerColumn)*c.params.slidesPerColumn);var s;for(e=0;e<c.slides.length;e++){s=0;var l=c.slides.eq(e);if(c.params.slidesPerColumn>1){var p,d,f,u,h=c.params.slidesPerColumn;"column"===c.params.slidesPerColumnFill?(d=Math.floor(e/h),f=e-d*h,p=d+f*i/h,l.css({"-webkit-box-ordinal-group":p,"-moz-box-ordinal-group":p,"-ms-flex-order":p,"-webkit-order":p,order:p})):(u=i/h,f=Math.floor(e/u),d=e-f*u),l.css({"margin-top":0!==f&&c.params.spaceBetween&&c.params.spaceBetween+"px"}).attr("data-swiper-column",d).attr("data-swiper-row",f)}"none"!==l.css("display")&&("auto"===c.params.slidesPerView?s=n()?l.outerWidth(!0):l.outerHeight(!0):(s=(c.size-(c.params.slidesPerView-1)*a)/c.params.slidesPerView,n()?c.slides[e].style.width=s+"px":c.slides[e].style.height=s+"px"),c.slides[e].swiperSlideSize=s,c.slidesSizesGrid.push(s),c.params.centeredSlides?(t=t+s/2+r/2+a,0===e&&(t=t-c.size/2-a),Math.abs(t)<.001&&(t=0),o%c.params.slidesPerGroup===0&&c.snapGrid.push(t),c.slidesGrid.push(t)):(o%c.params.slidesPerGroup===0&&c.snapGrid.push(t),c.slidesGrid.push(t),t=t+s+a),c.virtualWidth+=s+a,r=s,o++)}c.virtualWidth=Math.max(c.virtualWidth,c.size);var m;if(c.rtl&&c.wrongRTL&&("slide"===c.params.effect||"coverflow"===c.params.effect)&&c.wrapper.css({width:c.virtualWidth+c.params.spaceBetween+"px"}),c.params.slidesPerColumn>1&&(c.virtualWidth=(s+c.params.spaceBetween)*i,c.virtualWidth=Math.ceil(c.virtualWidth/c.params.slidesPerColumn)-c.params.spaceBetween,c.wrapper.css({width:c.virtualWidth+c.params.spaceBetween+"px"}),c.params.centeredSlides)){for(m=[],e=0;e<c.snapGrid.length;e++)c.snapGrid[e]<c.virtualWidth+c.snapGrid[0]&&m.push(c.snapGrid[e]);c.snapGrid=m}if(!c.params.centeredSlides){for(m=[],e=0;e<c.snapGrid.length;e++)c.snapGrid[e]<=c.virtualWidth-c.size&&m.push(c.snapGrid[e]);c.snapGrid=m,Math.floor(c.virtualWidth-c.size)>Math.floor(c.snapGrid[c.snapGrid.length-1])&&c.snapGrid.push(c.virtualWidth-c.size)}0===c.snapGrid.length&&(c.snapGrid=[0]),0!==c.params.spaceBetween&&c.slides.css(n()?c.rtl?{marginLeft:a+"px"}:{marginRight:a+"px"}:{marginBottom:a+"px"}),c.params.watchSlidesProgress&&c.updateSlidesOffset()},c.updateSlidesOffset=function(){for(var e=0;e<c.slides.length;e++)c.slides[e].swiperSlideOffset=n()?c.slides[e].offsetLeft:c.slides[e].offsetTop},c.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=c.translate||0),0!==c.slides.length){"undefined"==typeof c.slides[0].swiperSlideOffset&&c.updateSlidesOffset();var a=c.params.centeredSlides?-e+c.size/2:-e;c.rtl&&(a=c.params.centeredSlides?e-c.size/2:e);{c.container[0].getBoundingClientRect(),n()?"left":"top",n()?"right":"bottom"}c.slides.removeClass(c.params.slideVisibleClass);for(var t=0;t<c.slides.length;t++){var r=c.slides[t],o=c.params.centeredSlides===!0?r.swiperSlideSize/2:0,i=(a-r.swiperSlideOffset-o)/(r.swiperSlideSize+c.params.spaceBetween);if(c.params.watchVisibility){var s=-(a-r.swiperSlideOffset-o),l=s+c.slidesSizesGrid[t],p=s>=0&&s<c.size||l>0&&l<=c.size||0>=s&&l>=c.size;p&&c.slides.eq(t).addClass(c.params.slideVisibleClass)}r.progress=c.rtl?-i:i}}},c.updateProgress=function(e){"undefined"==typeof e&&(e=c.translate||0),c.progress=(e-c.minTranslate())/(c.maxTranslate()-c.minTranslate()),c.isBeginning=c.isEnd=!1,c.progress<=0&&(c.isBeginning=!0,c.params.onReachBeginning&&c.params.onReachBeginning(c)),c.progress>=1&&(c.isEnd=!0,c.params.onReachEnd&&c.params.onReachEnd(c)),c.params.watchSlidesProgress&&c.updateSlidesProgress(e),c.params.onProgress&&c.params.onProgress(c,c.progress)},c.updateActiveIndex=function(){var e,a,t,n=c.rtl?c.translate:-c.translate;for(a=0;a<c.slidesGrid.length;a++)"undefined"!=typeof c.slidesGrid[a+1]?n>=c.slidesGrid[a]&&n<c.slidesGrid[a+1]-(c.slidesGrid[a+1]-c.slidesGrid[a])/2?e=a:n>=c.slidesGrid[a]&&n<c.slidesGrid[a+1]&&(e=a+1):n>=c.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/c.params.slidesPerGroup),t>=c.snapGrid.length&&(t=c.snapGrid.length-1),e!==c.activeIndex&&(c.snapIndex=t,c.previousIndex=c.activeIndex,c.activeIndex=e,c.updateClasses())},c.updateClasses=function(){c.slides.removeClass(c.params.slideActiveClass+" "+c.params.slideNextClass+" "+c.params.slidePrevClass);var e=c.slides.eq(c.activeIndex);if(e.addClass(c.params.slideActiveClass),e.next("."+c.params.slideClass).addClass(c.params.slideNextClass),e.prev("."+c.params.slideClass).addClass(c.params.slidePrevClass),c.bullets&&c.bullets.length>0){c.bullets.removeClass(c.params.bulletActiveClass);var a;c.params.loop?(a=c.activeIndex-c.loopedSlides,a>c.slides.length-1-2*c.loopedSlides&&(a-=c.slides.length-2*c.loopedSlides)):a="undefined"!=typeof c.snapIndex?c.snapIndex:c.activeIndex||0,c.bullets.eq(a).addClass(c.params.bulletActiveClass)}c.params.loop||(c.params.prevButton&&(c.isBeginning?f(c.params.prevButton).addClass(c.params.buttonDisabledClass):f(c.params.prevButton).removeClass(c.params.buttonDisabledClass)),c.params.nextButton&&(c.isEnd?f(c.params.nextButton).addClass(c.params.buttonDisabledClass):f(c.params.nextButton).removeClass(c.params.buttonDisabledClass)))},c.updatePagination=function(){if(c.params.pagination&&c.paginationContainer&&c.paginationContainer.length>0){for(var e="",a=c.params.loop?c.slides.length-2*c.loopedSlides:c.snapGrid.length,t=0;a>t;t++)e+='<span class="'+c.params.bulletClass+'"></span>';c.paginationContainer.html(e),c.bullets=c.paginationContainer.find("."+c.params.bulletClass)}},c.update=function(e){if(c.updateContainerSize(),c.updateSlidesSize(),c.updateProgress(),c.updatePagination(),c.updateClasses(),c.params.scrollbar&&c.scrollbar&&c.scrollbar.set(),e){var a,t;a=c.isEnd?c.slideTo(c.slides.length-1,0,!1,!0):c.slideTo(c.activeIndex,0,!1,!0),a||(t=Math.min(Math.max(c.translate,c.maxTranslate()),c.minTranslate()),c.setWrapperTranslate(t))}},c.onResize=function(){c.updateContainerSize(),c.updateSlidesSize(),c.updateProgress(),c.updateClasses(),"auto"===c.params.slidesPerView&&c.updatePagination(),c.params.scrollbar&&c.scrollbar&&c.scrollbar.set(),c.isEnd?c.slideTo(c.slides.length-1,0,!1,!0):c.slideTo(c.activeIndex,0,!1,!0)};var u=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?u=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(u=["MSPointerDown","MSPointerMove","MSPointerUp"]),c.touchEvents={start:c.support.touch||!c.params.simulateTouch?"touchstart":u[0],move:c.support.touch||!c.params.simulateTouch?"touchmove":u[1],end:c.support.touch||!c.params.simulateTouch?"touchend":u[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===c.params.touchEventsTarget?c.container:c.wrapper).addClass("swiper-wp8-"+c.params.direction),c.events=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",n="container"===c.params.touchEventsTarget?c.container:c.wrapper,r=c.support.touch?n:f(document),o=c.params.nested?!0:!1;n[0][t](c.touchEvents.start,c.onTouchStart,!1),r[0][t](c.touchEvents.move,c.onTouchMove,o),r[0][t](c.touchEvents.end,c.onTouchEnd,!1),window[t]("resize",c.onResize),c.params.nextButton&&f(c.params.nextButton)[a]("click",c.onClickNext),c.params.prevButton&&f(c.params.prevButton)[a]("click",c.onClickPrev),c.params.pagination&&c.params.paginationClickable&&f(c.paginationContainer)[a]("click","."+c.params.bulletClass,c.onClickIndex),(c.params.preventClicks||c.params.preventClicksPropagation)&&n[0][t]("click",c.preventClicks,!0)},c.attachEvents=function(){c.events()},c.detachEvents=function(){c.events(!0)},c.allowClick=!0,c.preventClicks=function(e){c.allowClick||(c.params.preventClicks&&e.preventDefault(),c.params.preventClicksPropagation&&(e.stopPropagation(),e.stopImmediatePropagation()))},c.onClickNext=function(e){e.preventDefault(),c.slideNext()},c.onClickPrev=function(e){e.preventDefault(),c.slidePrev()},c.onClickIndex=function(e){e.preventDefault();var a=f(this).index()*c.params.slidesPerGroup;c.params.loop&&(a+=c.loopedSlides),c.slideTo(a)},c.updateClickedSlide=function(e){var a=i(e,"."+c.params.slideClass);if(!a)return c.clickedSlide=void 0,void(c.clickedIndex=void 0);if(c.clickedSlide=a,c.clickedIndex=f(a).index(),c.params.slideToClickedSlide&&void 0!==c.clickedIndex&&c.clickedIndex!==c.activeIndex){var t,n=c.clickedIndex;if(c.params.loop)if(t=f(c.clickedSlide).attr("data-swiper-slide-index"),n>c.slides.length-c.params.slidesPerView)c.fixLoop(),n=c.wrapper.children("."+c.params.slideClass+'[data-swiper-slide-index="'+t+'"]').eq(0).index(),setTimeout(function(){c.slideTo(n)},0);else if(n<c.params.slidesPerView-1){c.fixLoop();var r=c.wrapper.children("."+c.params.slideClass+'[data-swiper-slide-index="'+t+'"]');n=r.eq(r.length-1).index(),setTimeout(function(){c.slideTo(n)},0)}else c.slideTo(n);else c.slideTo(n)}};var h,m,g,v,w,b,C,y,x,T="input, select, textarea, button",k=Date.now(),S=[];return c.animating=!1,c.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0},c.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),!("mousedown"===e.type&&"which"in e&&3===e.which||c.params.noSwiping&&i(e,"."+c.params.noSwipingClass)||c.params.swipeHandler&&!i(e,c.params.swipeHandler))){if(h=!0,m=!1,v=void 0,c.touches.startX=c.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,c.touches.startY=c.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,g=Date.now(),c.allowClick=!0,c.updateContainerSize(),c.swipeDirection=void 0,c.params.threshold>0&&(C=!1),"touchstart"!==e.type){var a=!0;f(e.target).is(T)&&(a=!1),document.activeElement&&f(document.activeElement).is(T)&&document.activeElement.blur(),a&&e.preventDefault()}c.params.onTouchStart&&c.params.onTouchStart(c,e)}},c.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!e.preventedByNestedSwiper){if(c.params.onlyExternal)return m=!0,void(c.allowClick=!1);
if(c.params.onTouchMove&&c.params.onTouchMove(c,e),c.allowClick=!1,!(e.targetTouches&&e.targetTouches.length>1)){if(c.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,c.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof v){var a=180*Math.atan2(Math.abs(c.touches.currentY-c.touches.startY),Math.abs(c.touches.currentX-c.touches.startX))/Math.PI;v=n()?a>c.params.touchAngle:90-a>c.params.touchAngle}if(v&&c.params.onTouchMoveOpposite&&c.params.onTouchMoveOpposite(c,e),h){if(v)return void(h=!1);c.params.onSliderMove&&c.params.onSliderMove(c,e),e.preventDefault(),c.params.touchMoveStopPropagation&&!c.params.nested&&e.stopPropagation(),m||(t.loop&&c.fixLoop(),b="cube"===c.params.effect?(c.rtl?-c.translate:c.translate)||0:c.getWrapperTranslate(),c.setWrapperTransition(0),c.animating&&c.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),c.params.autoplay&&c.autoplaying&&(c.params.autoplayDisableOnInteraction?c.stopAutoplay():c.pauseAutoplay()),x=!1,c.params.grabCursor&&(c.container[0].style.cursor="move",c.container[0].style.cursor="-webkit-grabbing",c.container[0].style.cursor="-moz-grabbin",c.container[0].style.cursor="grabbing")),m=!0;var r=c.touches.diff=n()?c.touches.currentX-c.touches.startX:c.touches.currentY-c.touches.startY;r*=c.params.touchRatio,c.rtl&&(r=-r),c.swipeDirection=r>0?"prev":"next",w=r+b;var o=!0;if(r>0&&w>c.minTranslate()?(o=!1,c.params.resistance&&(w=c.minTranslate()-1+Math.pow(-c.minTranslate()+b+r,c.params.resistanceRatio))):0>r&&w<c.maxTranslate()&&(o=!1,c.params.resistance&&(w=c.maxTranslate()+1-Math.pow(c.maxTranslate()-b-r,c.params.resistanceRatio))),o&&(e.preventedByNestedSwiper=!0),!c.params.allowSwipeToNext&&"next"===c.swipeDirection&&b>w&&(w=b),!c.params.allowSwipeToPrev&&"prev"===c.swipeDirection&&w>b&&(w=b),c.params.followFinger){if(c.params.threshold>0){if(!(Math.abs(r)>c.params.threshold||C))return void(w=b);if(!C)return C=!0,c.touches.startX=c.touches.currentX,c.touches.startY=c.touches.currentY,w=b,void(c.touches.diff=n()?c.touches.currentX-c.touches.startX:c.touches.currentY-c.touches.startY)}(c.params.freeMode||c.params.watchSlidesProgress)&&c.updateActiveIndex(),c.params.freeMode&&(0===S.length&&S.push({position:c.touches[n()?"startX":"startY"],time:g}),S.push({position:c.touches[n()?"currentX":"currentY"],time:(new Date).getTime()})),c.updateProgress(w),c.setWrapperTranslate(w)}}}}},c.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),c.params.onTouchEnd&&c.params.onTouchEnd(c,e),h){c.params.grabCursor&&m&&h&&(c.container[0].style.cursor="move",c.container[0].style.cursor="-webkit-grab",c.container[0].style.cursor="-moz-grab",c.container[0].style.cursor="grab");var a=Date.now(),t=a-g;if(c.allowClick&&(c.updateClickedSlide(e),c.params.onTap&&c.params.onTap(c,e),300>t&&a-k>300&&(y&&clearTimeout(y),y=setTimeout(function(){c&&(c.params.paginationHide&&c.paginationContainer.length>0&&!f(e.target).hasClass(c.params.bulletClass)&&c.paginationContainer.toggleClass(c.params.paginationHiddenClass),c.params.onClick&&c.params.onClick(c,e))},300)),300>t&&300>a-k&&(y&&clearTimeout(y),c.params.onDoubleTap&&c.params.onDoubleTap(c,e))),k=Date.now(),setTimeout(function(){c&&c.allowClick&&(c.allowClick=!0)},0),!h||!m||!c.swipeDirection||0===c.touches.diff||w===b)return void(h=m=!1);h=m=!1;var n;if(n=c.params.followFinger?c.rtl?c.translate:-c.translate:-w,c.params.freeMode){if(n<-c.minTranslate())return void c.slideTo(c.activeIndex);if(n>-c.maxTranslate())return void c.slideTo(c.slides.length-1);if(c.params.freeModeMomentum){if(S.length>1){var r=S.pop(),o=S.pop(),i=r.position-o.position,s=r.time-o.time;c.velocity=i/s,c.velocity=c.velocity/2,Math.abs(c.velocity)<.02&&(c.velocity=0),(s>150||(new Date).getTime()-r.time>300)&&(c.velocity=0)}else c.velocity=0;S.length=0;var l=1e3*c.params.freeModeMomentumRatio,p=c.velocity*l,d=c.translate+p;c.rtl&&(d=-d);var u,v=!1,C=20*Math.abs(c.velocity)*c.params.freeModeMomentumBounceRatio;d<c.maxTranslate()&&(c.params.freeModeMomentumBounce?(d+c.maxTranslate()<-C&&(d=c.maxTranslate()-C),u=c.maxTranslate(),v=!0,x=!0):d=c.maxTranslate()),d>c.minTranslate()&&(c.params.freeModeMomentumBounce?(d-c.minTranslate()>C&&(d=c.minTranslate()+C),u=c.minTranslate(),v=!0,x=!0):d=c.minTranslate()),0!==c.velocity&&(l=Math.abs(c.rtl?(-d-c.translate)/c.velocity:(d-c.translate)/c.velocity)),c.params.freeModeMomentumBounce&&v?(c.updateProgress(u),c.setWrapperTranslate(d),c.setWrapperTransition(l),c.onTransitionStart(),c.animating=!0,c.wrapper.transitionEnd(function(){x&&(c.params.onMomentumBounce&&c.params.onMomentumBounce(c),c.setWrapperTranslate(u),c.setWrapperTransition(c.params.speed),c.wrapper.transitionEnd(function(){c.onTransitionEnd()}))})):c.velocity?(c.updateProgress(d),c.setWrapperTranslate(d),c.setWrapperTransition(l),c.onTransitionStart(),c.animating||(c.animating=!0,c.wrapper.transitionEnd(function(){c.onTransitionEnd()}))):c.updateProgress(d),c.updateActiveIndex()}return void((!c.params.freeModeMomentum||t>=c.params.longSwipesMs)&&(c.updateProgress(),c.updateActiveIndex()))}var T,P=0,M=c.slidesSizesGrid[0];for(T=0;T<c.slidesGrid.length;T+=c.params.slidesPerGroup)"undefined"!=typeof c.slidesGrid[T+c.params.slidesPerGroup]?n>=c.slidesGrid[T]&&n<c.slidesGrid[T+c.params.slidesPerGroup]&&(P=T,M=c.slidesGrid[T+c.params.slidesPerGroup]-c.slidesGrid[T]):n>=c.slidesGrid[T]&&(P=T,M=c.slidesGrid[c.slidesGrid.length-1]-c.slidesGrid[c.slidesGrid.length-2]);var O=(n-c.slidesGrid[P])/M;if(t>c.params.longSwipesMs){if(!c.params.longSwipes)return void c.slideTo(c.activeIndex);"next"===c.swipeDirection&&c.slideTo(O>=c.params.longSwipesRatio?P+c.params.slidesPerGroup:P),"prev"===c.swipeDirection&&c.slideTo(O>1-c.params.longSwipesRatio?P+c.params.slidesPerGroup:P)}else{if(!c.params.shortSwipes)return void c.slideTo(c.activeIndex);"next"===c.swipeDirection&&c.slideTo(P+c.params.slidesPerGroup),"prev"===c.swipeDirection&&c.slideTo(P)}}},c._slideTo=function(e,a){return c.slideTo(e,a,!0,!0)},c.slideTo=function(e,a,t,r){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),c.snapIndex=Math.floor(e/c.params.slidesPerGroup),c.snapIndex>=c.snapGrid.length&&(c.snapIndex=c.snapGrid.length-1);var o=-c.snapGrid[c.snapIndex];c.params.autoplay&&c.autoplaying&&(r||!c.params.autoplayDisableOnInteraction?c.pauseAutoplay(a):c.stopAutoplay()),c.updateProgress(o);for(var i=0;i<c.slidesGrid.length;i++)-o>=c.slidesGrid[i]&&(e=i);if("undefined"==typeof a&&(a=c.params.speed),c.previousIndex=c.activeIndex||0,c.activeIndex=e,o===c.translate)return c.updateClasses(),!1;t&&c.onTransitionStart();n()?o:0,n()?0:o;return 0===a?(c.setWrapperTransition(0),c.setWrapperTranslate(o),t&&c.onTransitionEnd()):(c.setWrapperTransition(a),c.setWrapperTranslate(o),c.animating||(c.animating=!0,c.wrapper.transitionEnd(function(){t&&c.onTransitionEnd()}))),c.updateClasses(),!0},c.onTransitionStart=function(){c.params.onTransitionStart&&c.params.onTransitionStart(c),c.params.onSlideChangeStart&&c.activeIndex!==c.previousIndex&&c.params.onSlideChangeStart(c)},c.onTransitionEnd=function(){c.animating=!1,c.setWrapperTransition(0),c.params.onTransitionEnd&&c.params.onTransitionEnd(c),c.params.onSlideChangeEnd&&c.activeIndex!==c.previousIndex&&c.params.onSlideChangeEnd(c)},c.slideNext=function(e,a,t){if(c.params.loop){if(c.animating)return!1;c.fixLoop();{c.container[0].clientLeft}return c.slideTo(c.activeIndex+c.params.slidesPerGroup,a,e,t)}return c.slideTo(c.activeIndex+c.params.slidesPerGroup,a,e,t)},c._slideNext=function(e){return c.slideNext(!0,e,!0)},c.slidePrev=function(e,a,t){if(c.params.loop){if(c.animating)return!1;c.fixLoop();{c.container[0].clientLeft}return c.slideTo(c.activeIndex-1,a,e,t)}return c.slideTo(c.activeIndex-1,a,e,t)},c._slidePrev=function(e){return c.slidePrev(!0,e,!0)},c.slideReset=function(e,a){return c.slideTo(c.activeIndex,a,e)},c.setWrapperTransition=function(e,a){c.wrapper.transition(e),c.params.onSetTransition&&c.params.onSetTransition(c,e),"slide"!==c.params.effect&&c.effects[c.params.effect]&&c.effects[c.params.effect].setTransition(e),c.params.scrollbar&&c.scrollbar&&c.scrollbar.setTransition(e),c.params.control&&c.controller&&c.controller.setTransition(e,a)},c.setWrapperTranslate=function(e,a,t){var r=0,o=0,i=0;n()?r=c.rtl?-e:e:o=e,c.wrapper.transform(c.support.transforms3d?"translate3d("+r+"px, "+o+"px, "+i+"px)":"translate("+r+"px, "+o+"px)"),c.translate=n()?r:o,a&&c.updateActiveIndex(),"slide"!==c.params.effect&&c.effects[c.params.effect]&&c.effects[c.params.effect].setTranslate(c.translate),c.params.scrollbar&&c.scrollbar&&c.scrollbar.setTranslate(c.translate),c.params.control&&c.controller&&c.controller.setTranslate(c.translate,t),c.params.hashnav&&c.hashnav&&c.hashnav.setHash(),c.params.onSetTranslate&&c.params.onSetTranslate(c,c.translate)},c.getTranslate=function(e,a){var t,n,r,o;return"undefined"==typeof a&&(a="x"),r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?o=new WebKitCSSMatrix("none"===r.webkitTransform?"":r.webkitTransform):(o=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=o.toString().split(",")),"x"===a&&(n=window.WebKitCSSMatrix?o.m41:parseFloat(16===t.length?t[12]:t[4])),"y"===a&&(n=window.WebKitCSSMatrix?o.m42:parseFloat(16===t.length?t[13]:t[5])),c.rtl&&n&&(n=-n),n||0},c.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=n()?"x":"y"),c.getTranslate(c.wrapper[0],e)},c.observers=[],c.initObservers=function(){if(c.params.observeParents)for(var e=c.container.parents(),a=0;a<e.length;a++)s(e[a]);s(c.container[0],{childList:!1}),s(c.wrapper[0],{attributes:!1})},c.disconnectObservers=function(){for(var e=0;e<c.observers.length;e++)c.observers[e].disconnect();c.observers=[]},c.createLoop=function(){c.wrapper.children("."+c.params.slideClass+"."+c.params.slideDuplicateClass).remove();var e=c.wrapper.children("."+c.params.slideClass);c.loopedSlides=parseInt(c.params.loopedSlides||c.params.slidesPerView,10),c.loopedSlides=c.loopedSlides+c.params.loopAdditionalSlides,c.loopedSlides>e.length&&(c.loopedSlides=e.length);var a,t=[],n=[];for(e.each(function(a,r){var o=f(this);a<c.loopedSlides&&n.push(r),a<e.length&&a>=e.length-c.loopedSlides&&t.push(r),o.attr("data-swiper-slide-index",a)}),a=0;a<n.length;a++)c.wrapper.append(f(n[a].cloneNode(!0)).addClass(c.params.slideDuplicateClass));for(a=t.length-1;a>=0;a--)c.wrapper.prepend(f(t[a].cloneNode(!0)).addClass(c.params.slideDuplicateClass))},c.destroyLoop=function(){c.wrapper.children("."+c.params.slideClass+"."+c.params.slideDuplicateClass).remove()},c.fixLoop=function(){var e;c.activeIndex<c.loopedSlides?(e=c.slides.length-3*c.loopedSlides+c.activeIndex,e+=c.loopedSlides,c.slideTo(e,0,!1,!0)):("auto"===c.params.slidesPerView&&c.activeIndex>=2*c.loopedSlides||c.activeIndex>c.slides.length-2*c.params.slidesPerView)&&(e=-c.slides.length+c.activeIndex+c.loopedSlides,e+=c.loopedSlides,c.slideTo(e,0,!1,!0))},c.appendSlide=function(e){if(c.params.loop&&c.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&c.wrapper.append(e[a]);else c.wrapper.append(e);c.params.loop&&c.createLoop(),c.params.observer&&c.support.observer||c.update(!0)},c.prependSlide=function(e){c.params.loop&&c.destroyLoop();var a=c.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&c.wrapper.prepend(e[t]);a=c.activeIndex+e.length}else c.wrapper.prepend(e);c.params.loop&&c.createLoop(),c.params.observer&&c.support.observer||c.update(!0),c.slideTo(a,0,!1)},c.removeSlide=function(e){c.params.loop&&c.destroyLoop();var a,t=c.activeIndex;if("object"==typeof e&&e.length){for(var n=0;n<e.length;n++)a=e[n],c.slides[a]&&c.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,c.slides[a]&&c.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);c.params.observer&&c.support.observer||c.update(!0),c.slideTo(t,0,!1)},c.removeAllSlides=function(){for(var e=[],a=0;a<c.slides.length;a++)e.push(a);c.removeSlide(e)},c.effects={fade:{setTranslate:function(){for(var e=0;e<c.slides.length;e++){var a=c.slides.eq(e),t=a[0].swiperSlideOffset,r=-t-c.translate,o=0;n()||(o=r,r=0),a.css({opacity:1+Math.min(Math.max(a[0].progress,-1),0)}).transform("translate3d("+r+"px, "+o+"px, 0px)")}},setTransition:function(e){c.slides.transition(e)}},cube:{setTranslate:function(){var e,a=0;c.params.cube.shadow&&(n()?(e=c.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=f('<div class="swiper-cube-shadow"></div>'),c.wrapper.append(e)),e.css({height:c.width+"px"})):(e=c.container.find(".swiper-cube-shadow"),0===e.length&&(e=f('<div class="swiper-cube-shadow"></div>'),c.container.append(e))));for(var t=0;t<c.slides.length;t++){var r=c.slides.eq(t),o=90*t,i=Math.floor(o/360);c.rtl&&(o=-o,i=Math.floor(-o/360));var s=Math.max(Math.min(r[0].progress,1),-1),l=0,p=0,d=0;t%4===0?(l=4*-i*c.size,d=0):(t-1)%4===0?(l=0,d=4*-i*c.size):(t-2)%4===0?(l=c.size+4*i*c.size,d=c.size):(t-3)%4===0&&(l=-c.size,d=3*c.size+4*c.size*i),c.rtl&&(l=-l),n()||(p=l,l=0);var u="rotateX("+(n()?0:-o)+"deg) rotateY("+(n()?o:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(1>=s&&s>-1&&(a=90*t+90*s,c.rtl&&(a=90*-t-90*s)),r.transform(u),c.params.cube.slideShadows){var h=r.find(n()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),m=r.find(n()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===h.length&&(h=f('<div class="swiper-slide-shadow-'+(n()?"left":"top")+'"></div>'),r.append(h)),0===m.length&&(m=f('<div class="swiper-slide-shadow-'+(n()?"right":"bottom")+'"></div>'),r.append(m));{r[0].progress}h.length&&(h[0].style.opacity=-r[0].progress),m.length&&(m[0].style.opacity=r[0].progress)}}if(c.wrapper.css({"-webkit-transform-origin":"50% 50% -"+c.size/2+"px","-moz-transform-origin":"50% 50% -"+c.size/2+"px","-ms-transform-origin":"50% 50% -"+c.size/2+"px","transform-origin":"50% 50% -"+c.size/2+"px"}),c.params.cube.shadow)if(n())e.transform("translate3d(0px, "+(c.width/2+c.params.cube.shadowOffset)+"px, "+-c.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+c.params.cube.shadowScale+")");else{var g=Math.abs(a)-90*Math.floor(Math.abs(a)/90),v=1.5-(Math.sin(2*g*Math.PI/360)/2+Math.cos(2*g*Math.PI/360)/2),w=c.params.cube.shadowScale,b=c.params.cube.shadowScale/v,C=c.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+b+") translate3d(0px, "+(c.height/2+C)+"px, "+-c.height/2/b+"px) rotateX(-90deg)")}var y=c.isSafari||c.isUiWebView?-c.size/2:0;c.wrapper.transform("translate3d(0px,0,"+y+"px) rotateX("+(n()?0:a)+"deg) rotateY("+(n()?-a:0)+"deg)")},setTransition:function(e){c.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),c.params.cube.shadow&&!n()&&c.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=c.translate,a=n()?-e+c.width/2:-e+c.height/2,t=n()?c.params.coverflow.rotate:-c.params.coverflow.rotate,r=c.params.coverflow.depth,o=0,i=c.slides.length;i>o;o++){var s=c.slides.eq(o),l=c.slidesSizesGrid[o],p=s[0].swiperSlideOffset,d=(a-p-l/2)/l*c.params.coverflow.modifier,u=n()?t*d:0,h=n()?0:t*d,m=-r*Math.abs(d),g=n()?0:c.params.coverflow.stretch*d,v=n()?c.params.coverflow.stretch*d:0;Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(h)<.001&&(h=0);var w="translate3d("+v+"px,"+g+"px,"+m+"px)  rotateX("+h+"deg) rotateY("+u+"deg)";if(s.transform(w),s[0].style.zIndex=-Math.abs(Math.round(d))+1,c.params.coverflow.slideShadows){var b=s.find(n()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),C=s.find(n()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===b.length&&(b=f('<div class="swiper-slide-shadow-'+(n()?"left":"top")+'"></div>'),s.append(b)),0===C.length&&(C=f('<div class="swiper-slide-shadow-'+(n()?"right":"bottom")+'"></div>'),s.append(C)),b.length&&(b[0].style.opacity=d>0?d:0),C.length&&(C[0].style.opacity=-d>0?-d:0)}}if(window.navigator.pointerEnabled||window.navigator.msPointerEnabled){var y=c.wrapper.style;y.perspectiveOrigin=a+"px 50%"}},setTransition:function(e){c.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},c.scrollbar={set:function(){if(c.params.scrollbar){var e=c.scrollbar;e.track=f(c.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=f('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=n()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=c.size/c.virtualWidth,e.moveDivider=e.divider*(e.trackSize/c.size),e.dragSize=e.trackSize*e.divider,n()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",c.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(c.params.scrollbar){var e,a=c.scrollbar,t=(c.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*c.progress,c.rtl&&n()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),n()?(a.drag.transform("translate3d("+e+"px, 0, 0)"),a.drag[0].style.width=t+"px"):(a.drag.transform("translate3d(0px, "+e+"px, 0)"),a.drag[0].style.height=t+"px"),c.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){c.params.scrollbar&&c.scrollbar.drag.transition(e)}},c.controller={setTranslate:function(e,a){var t,n,r=c.params.control;if(c.isArray(r))for(var o=0;o<r.length;o++)r[o]!==a&&r[o]instanceof Swiper&&(e=r[o].rtl&&"horizontal"===r[o].params.direction?-c.translate:c.translate,t=(r[o].maxTranslate()-r[o].minTranslate())/(c.maxTranslate()-c.minTranslate()),n=(e-c.minTranslate())*t+r[o].minTranslate(),c.params.controlInverse&&(n=r[o].maxTranslate()-n),r[o].updateProgress(n),r[o].setWrapperTranslate(n,!1,c),r[o].updateActiveIndex());else r instanceof Swiper&&a!==r&&(e=r.rtl&&"horizontal"===r.params.direction?-c.translate:c.translate,t=(r.maxTranslate()-r.minTranslate())/(c.maxTranslate()-c.minTranslate()),n=(e-c.minTranslate())*t+r.minTranslate(),c.params.controlInverse&&(n=r.maxTranslate()-n),r.updateProgress(n),r.setWrapperTranslate(n,!1,c),r.updateActiveIndex())},setTransition:function(e,a){var t=c.params.control;if(c.isArray(t))for(var n=0;n<t.length;n++)t[n]!==a&&t[n]instanceof Swiper&&t[n].setWrapperTransition(e,c);else t instanceof Swiper&&a!==t&&t.setWrapperTransition(e,c)}},c.init=function(){c.params.loop&&c.createLoop(),c.updateContainerSize(),c.updateSlidesSize(),c.updatePagination(),c.params.scrollbar&&c.scrollbar&&c.scrollbar.set(),"slide"!==c.params.effect&&c.effects[c.params.effect]&&(c.params.loop||c.updateProgress(),c.effects[c.params.effect].setTranslate()),c.params.loop?c.slideTo(c.params.initialSlide+c.loopedSlides,0,c.params.runCallbacksOnInit):c.slideTo(c.params.initialSlide,0,c.params.runCallbacksOnInit),c.attachEvents(),c.params.observer&&c.support.observer&&c.initObservers(),c.params.updateOnImagesReady&&c.preloadImages(),c.params.autoplay&&c.startAutoplay(),c.params.keyboardControl&&c.enableKeyboardControl&&c.enableKeyboardControl(),c.params.mousewheelControl&&c.enableMousewheelControl&&c.enableMousewheelControl(),c.params.hashnav&&c.hashnav&&c.hashnav.init(),c.params.onInit&&c.params.onInit(c)},c.destroy=function(e){c.detachEvents(),c.disconnectObservers(),c.params.keyboardControl&&c.disableKeyboardControl&&c.disableKeyboardControl(),c.params.mousewheelControl&&c.disableMousewheelControl&&c.disableMousewheelControl(),c.params.onDestroy&&c.params.onDestroy(),e!==!1&&(c=null)},c.init(),c}},Swiper.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="WebkitBox msFlexbox MsFlexbox WebkitFlex MozBox flex".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()}}}();
//# sourceMappingURL=framework7.min.js.map

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.16 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.16',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i == 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return  getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if(args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                 //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));


'use strict';

define('CreditDetailView', function(){

	return Backbone.View.extend({
		
		el: '#dataListDetail',
		
		wrapper: '#dataListDetailWrap',
		
		detailTemplate: _.template($('#detailTmpl').html()),
		
		initialize: function(options){
			this.options = options;
			this.listenTo(this.options.credits, 'all', this.render);
		},
		
		events: {
			'click .removeBtn' : 'settleItem',
			'click .rejectBtn' : 'rejectItem'
		},
		
		render: function(){
			var _view = this;
			var _credits = _view.options.credits;
			var sgd = window.sgd;

			_view.$el.empty();

			if(_credits.length){
				$(_view.wrapper).show();
				_credits.each(function(credit){
					var obj = credit.toJSON();
					if(obj.creditorUID === sgd.userUID){
						obj.creatorName = (obj.creatorUID === sgd.userUID) ? obj.creditorName : obj.debtorsName;
					} else {
						obj.price *= -1;
						obj.creatorName = (obj.creatorUID === sgd.userUID) ? obj.debtorsName : obj.creditorName;
					}
					obj.settlable = (obj.creatorUID === sgd.userUID) ? true : false;
					_view.$el.prepend(_view.detailTemplate(obj));
				});
			} else {
				$(_view.wrapper).hide();
			}
		},
		
		settleItem: function(e){
			var itemID = $(e.currentTarget).data('itemid');
			var _view  = this;
			var _credits = _view.options.credits;
			var sgd = window.sgd;

			$.ajax({
				url: sgd.apiPrefix + '/api/debtsRemove',
				dataType: 'jsonp',
				data: { itemid: itemID, uid: sgd.userUID },
				success: function (data) {
					if(data.status){
						var removed = _credits.where({ _id: itemID });
						_.each(removed, function(pObj){
							pObj.set({ hidden: true });
						});
						_credits.remove(removed);
						if(_credits.length <= 0)
							sgd.changeSection('home');
					}
				}
			});
		},
		
		rejectItem: function(e){
			var _view = this;
			var itemID = $(e.currentTarget).data('itemid');

			var sgd = window.sgd;

			sgd.framework7.prompt('Why do u reject this debt?', 'Reject debt', function (value) {
				if(value != ''){
					$.ajax({
						url: sgd.apiPrefix + '/api/debtsReject',
						type: 'get',
						dataType: 'jsonp',
						data: { itemid: itemID, reason: value, uid: sgd.userUID },
						success: function (data) {
							if(data.status){
								sgd.framework7.swipeoutDelete('#item_' + itemID, function(a,b,c){
									var _item = _view.options.credits.where({ _id : itemID });
									var _removed = _view.options.credits.remove(_item);
									_removed[0].set({ reject:value });

									_view.options.rejectItemCallback(_removed[0]);
								
								});
							}
						}
					});
				}
			});
		}

	});
});

'use strict';

define('NotificationHandler', function(){

	var pushNotification = null;

	var deviceToken = null;

	return Backbone.Model.extend({

		getDeviceToken: function(){
			return deviceToken;
		},

		initialize: function(){

			document.addEventListener('deviceready', function(){
	
				pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
				
				pushNotification.onDeviceReady({ pw_appid:"01C24-D0542" });

				pushNotification.registerDevice(
					function(status) {
						deviceToken = status['deviceToken'];
						console.warn('registerDevice: ' + deviceToken);
					},
					function(status) {
						console.warn('failed to register : ' + JSON.stringify(status));
						console.log(JSON.stringify(['failed to register ', status]));
					}
				);

				document.addEventListener('push-notification', function(event) {
					var notification = event.notification;
					alert(notification.aps.alert);
					pushNotification.setApplicationIconBadgeNumber(0);
				});
				 
				pushNotification.setApplicationIconBadgeNumber(0);

			}, false);

		}

	});

});


'use strict';

define('CreditView', function(){
	return Backbone.View.extend({
		el: '#dataList',
		mainListTemplate: _.template($("#mainListTmpl").html()),
		events: {
			'click .item-content' : 'showDetail'
		},
		initialize: function(options){
			this.options = options;
			this.listenTo(this.options.credits, 'all', this.render);
		},
		render: function(){
			var _view = this;
			var _credits = _view.options.credits;
			var allData = new Backbone.Collection();
				allData.comparator = 'name';
			var userUID = sgd.userUID;
			
			_view.$el.empty();
			if(_credits.length){
				_credits.each(function(credit){
					var obj = credit.toJSON();
					var checkDataModel = function(pObj, pIndexKey){
						var dataModel = allData.where(pObj);
						var _price = (pIndexKey == 'debtorsUID') ? obj.price : (obj.price * -1);
						if(dataModel.length<=0){
							var _name = (pIndexKey == 'debtorsUID') ? (obj.debtorsName) : (obj.creditorName);
							allData.add({ 
								id: obj[pIndexKey],
								name: _name,
								price: (obj.reject) ? 0 : _price,
								rejected: !!(obj.reject)
							});
						} else {
							var curPrice = dataModel[0].get('price');
							dataModel[0].set({ price: curPrice + ((obj.reject) ? 0 : _price) });
							if(obj.reject) dataModel[0].set({ rejected : true });
						}
					}
					if(obj.creditorUID == userUID){
						checkDataModel({ id: obj.debtorsUID }, 'debtorsUID');
					} else {
						checkDataModel({ id: obj.creditorUID }, 'creditorUID');
					}
				});
				allData.each(function(pModel){
					var obj = pModel.toJSON();
					_view.$el.append(_view.mainListTemplate(obj));
				});
				$('#dataListError').hide();
				$('#dataListWrap').show()
			} else {
				$('#dataListError').show();
				$('#dataListWrap').hide();
			}
		},
		showDetail: function(e){
			var cid = $(e.currentTarget).find('.cid').val();
			sgd.changeSection('detail', { uid: cid });
		}
	});
});

'use strict';

define('DebtsCredits', ['CreditView', 'CreditDetailView', 'RejectedView'], function(_creditView, _creditDetailView, _rejectedView){
	var _ctrl = Backbone.Model.extend({

		credits: null,

		creditDetail: null,

		rejectedDetail: null,

		creditDetailView: null,

		rejectedView: null,

		initialize: function(){
			var _this = this;

			var _credits = Backbone.Collection.extend({
				url: sgd.apiPrefix + '/api/debtsCredits'
			});
			_this.credits = new _credits();
			_this.credits.fetchDatas = function(pSetting){
				this.fetch(_.extend({ 
					dataType: 'jsonp', 
					data:{ uid: sgd.userUID } 
				}, pSetting));
			};
			_this.credits.fetchDatas();


			var creditsDetail = new Backbone.Collection();
				creditsDetail.comparator = 'createdAt';
			_this.creditsDetail = creditsDetail;
			var rejectedDetail = new Backbone.Collection();
				rejectedDetail.comparator = 'createdAt';
			_this.rejectedDetail = rejectedDetail;


			var creditView = new _creditView({
				credits: _this.credits
			});

			var creditDetailView = new _creditDetailView({
				credits: creditsDetail,
				rejectItemCallback: function(pObj){
					rejectedDetail.add(pObj);
				}
			});
			_this.creditDetailView = creditDetailView;

			var rejectedView = new _rejectedView({
				credits: rejectedDetail,
				acceptItemCallback: function(pObj){
					creditsDetail.add(pObj);
				}
			});
			_this.rejectedView = rejectedView;
		},

		loadDetailByUID: function(pUID){
			var _this = this;
			var modelCredits = _this.credits.where({ creditorUID : pUID });
			var modelDebts = _this.credits.where({ debtorsUID : pUID });
			var allModel = modelCredits.concat(modelDebts);
			
			_this.creditsDetail.reset();
			_this.rejectedDetail.reset();

			if(allModel.length <= 0){
				$(_this.creditDetailView.wrapper).hide();
				$(_this.rejectedView.wrapper).hide();
				$('#dataListDetailError').show();
				$('#connectUser').hide();
			} else {
				var rejected = [];
				var normal = [];
				$.each(allModel, function(pIndex, pVal){
					if(pVal.get('reject'))
						rejected.push(pVal)
					else 
						normal.push(pVal);
				});
				if(normal.length){
					_this.creditsDetail.add(normal);
					$(_this.creditDetailView.wrapper).show();
				} else {
					$(_this.creditDetailView.wrapper).hide();
				}
				if(rejected.length){
					_this.rejectedDetail.add(rejected);
					$(_this.rejectedView.wrapper).show();
				} else {
					$(_this.rejectedView.wrapper).hide();
				}
			}
		},

		getUserByUID: function(pUID){
			var result = this.credits.filter(function(pObj){
				return (pObj.get('creditorUID') == pUID || pObj.get('debtorsUID') == pUID);
			});
			return (result.length > 0) ? result[0] : false;
		},

		getSumByUID: function(pUID){
			var debts = this.credits.filter(function(pObj){
				return (pObj.get('creditorUID') == pUID || pObj.get('debtorsUID') == pUID);
			});
			var sum = 0;
			for(var i=0; i<debts.length; i++){
				var debt = debts[i];
				if(!debt.get('reject') && !debt.get('hidden')){
					if(debt.get('creditorUID') === pUID)
						sum -= debt.get('price');
					else 
						sum += debt.get('price');
				}
			}
			return sum;
		},

		clearDetailDatas: function(){
			this.creditDetailView.$el.empty();
			this.rejectedView.$el.empty();
		}

	});

	return _ctrl;
});

'use strict';

define('FacebookHelper', function(){
	return Backbone.Model.extend({

		initialize: function(){
			var sgd = (window.sgd) ? window.sgd : {};
			if(sgd.fbAppID){
				window.fbAsyncInit = function() {
					FB.init({
						appId      : sgd.fbAppID,
						xfbml      : true,
						version    : 'v2.2'
					});
					FB.getLoginStatus();
				};

				(function(d, s, id){
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {return;}
					js = d.createElement(s); js.id = id;
					js.src = "https://connect.facebook.net/en_US/sdk.js";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			}
		},

		getFriendList: function(pCallback){
			FB.api('/me/friends', {
				access_token : sgd.accessToken
			}, function(response) {
 				pCallback(response);
			});
		},
		getInvitableList: function(pCallback){
			FB.api('/me/taggable_friends', {
					access_token : sgd.accessToken
				}, function(response) {
 				pCallback(response);
			});
		}
	});
});

'use strict';

define('PopupFriendList', function(){
	return Backbone.Model.extend({

		invitableFds: null,
		invitableView: null,

		regFds: null,
		regView: null,

		userOnClick: function(){},

		initialize: function(){
			var _this = this;

			var _regView = Backbone.View.extend({
				el: _this.get('friendTarget'),
				tmpl: _.template($("#regFriendList").html()),
				events: {
					'click .item-content' : 'recordUserID'
				},
				recordUserID: function(e){
					var userID = $(e.currentTarget).data('userid');
					if(userID)
						_this.userOnClick(userID);
				},
				initialize: function(options){
					var _view = this;
					_view.options = options;
					_view.listenTo(_view.options.collection, 'all', _view.render);
				},
				render: function(){
					var _view = this;
					_view.$el.empty();
					_view.options.collection.each(function(pColl){
						var obj = pColl.toJSON();
						_view.$el.append(_view.tmpl(obj));
					});
					$(_this.get("wrapper")).removeClass("preloading");
				}
			});
			_this.regFds = new Backbone.Collection();
			_this.regView = new _regView({ collection: _this.regFds });
		},

		loadFormPicker: function(){
			var _this = this;
			_this.userOnClick = function(userID){
				$("#otherUserID").val(userID);
				sgd.framework7.closeModal();
				sgd.changeSection('form-second', [], true);
			};
			sgd.framework7.popup('#friendList');
		},

		loadUserPicker: function(pCallback){
			var _this = this;
			_this.userOnClick = function(userID){
				sgd.framework7.closeModal();
				if(pCallback) pCallback(userID);
			};
			sgd.framework7.popup('#friendList');
		},

		startLoading: function(){
			var _this = this;
			
			$(_this.get("wrapper")).addClass("preloading");

			_this.get("getFriendHandler")(function(pRes){
				_this.regFds.reset();
				if(pRes.data.length){
					_this.regFds.add(pRes.data);
					_this.regView.$el.show();
				} else {
					_this.regView.$el.hide();
				}
			});
		},

		fetchData: function(pTarget, pColl){
			var _this = this;
			var tmpl = _.template($(_this.get("templateID")).html());
			pTarget.show();
			_.each(pColl.toJSON(), function(pObj){
				pTarget.find("ul").append(tmpl(pObj));
			});
		}
	});
});

'use strict';

define('RejectedView', function(){
	return Backbone.View.extend({
		el: '#rejectListDetail',
		wrapper: '#rejectListDetailWrap',
		detailTemplate: _.template($("#rejectedTmpl").html()),
		initialize: function(options){
			this.options = options;
			this.listenTo(this.options.credits, 'all', this.render);
		},
		events: {
			'click .rebornBtn' : 'rebornItem',
			'click .acceptBtn' : 'acceptItem'
		},
		rebornItem: function(e){
			var itemID = $(e.currentTarget).data('itemid');
			var _view  = this;
			var _credits = _view.options.credits;
			var _reborn = _credits.where({ _id:itemID });
			var _r = _reborn[0].toJSON();
			var isCreatorDebt = (_r.creatorUID === _r.debtorsUID);
			if(isCreatorDebt)
				$(".debtType .middle").addClass('creatorDebt');
			else
				$(".debtType .middle").removeClass('creatorDebt');
			$("#debtForm input[name=price]").val(_r.price);
			$("#debtForm input[name=desc]").val(_r.desc);
			$("#otherUserID").val((isCreatorDebt) ? _r.creditorUID : _r.debtorsUID);
			$("#otherUserName").val((isCreatorDebt) ? _r.creditorName : _r.debtorsName);
			$("#debtForm input[name=itemid]").val(itemID);
			$("#debtForm input[name=callback]").val((isCreatorDebt) ? _r.creditorUID : _r.debtorsUID);
			sgd.changeSection('form-second', [], true);
		},
		acceptItem: function(e){
			var itemID = $(e.currentTarget).data('itemid');
			var _view  = this;
			var _credits = _view.options.credits;
			$.ajax({
				url: sgd.apiPrefix + '/api/debtsAccept',
				dataType: 'jsonp',
				data: { itemid: itemID, uid: sgd.userUID },
				success: function (data) {
					if(data.status){
						var _remove = _credits.remove(_credits.where({ _id:itemID }));
							_remove[0].set({ reject : "" });
						
						_view.options.acceptItemCallback(_remove[0]);
					}
				}
			});
		},
		render: function(){
			var _view = this;
			var userUID = sgd.userUID;
			_view.$el.empty();
			if(_view.options.credits.length){
				_view.options.credits.each(function(credit){
					$(_view.wrapper).show();
					var obj = credit.toJSON();
					if(obj.creditorUID == userUID){
						obj.creatorName = (obj.creatorUID == userUID) ? obj.creditorName : obj.debtorsName;
					} else {
						obj.price *= -1;
						obj.creatorName = (obj.creatorUID == userUID) ? obj.debtorsName : obj.creditorName;
					}
					obj.creator = (obj.creatorUID == userUID) ? true : false;
					_view.$el.append(_view.detailTemplate(obj));
				});
			} else {
				$(_view.wrapper).hide();
			}
		}
	});
});

'use strict';

define('PageBase', function(){
	return Backbone.Model.extend({
		initialize: function(){},
		beforeShow: function(){},
		onShow: function(pParam, next){ next() },
		afterShow: function(){},
		hide: function(){}
	});
});

'use strict';

define('PageLogin', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};

	return pb.extend({

		initialize: function(){

			// if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
					var beforeLogin = function(pObj){
						window.localStorage.setItem("at", pObj.authResponse.accessToken);
						window.localStorage.setItem("uid", pObj.authResponse.userID);
						_sgd.changeSection('home');
					};


					if(window.localStorage.getItem('at') && window.localStorage.getItem('uid')){
						_sgd.changeSection('home');
					} else {
						facebookConnectPlugin.getLoginStatus(function(data){
							if(data.status === 'connected'){
								beforeLogin(data);
							}
						});
					}

					$('.facebookLogin').on('click', function(){
						facebookConnectPlugin.login(['public_profile, user_friends'],
							function (data) {
								if(data.status === 'connected'){
									beforeLogin(data);
								}
							},
							function (error) { alert('' + error); }
						);
					});



			
			// } else {

			// 	$('.facebookLogin').on('click', function(){
			// 		// Kenji Wong
			// 		window.localStorage.setItem("at", 'CAATsZC95ci0sBALFOpH9R49q2eTKqPUR0aY3fv0cOF2eSI121JPUtmaNrOdYay7YOLAecogqCMOnzZCsBqKkEEZBmA5FcqUZBHPz4mqdxGz82osRPfQnUb6fRI6Emy3GQvjRMtg7xuxIkQlZCsGVHHCKiRhL4H3KikqYxZATCjIheffLlPJBtdRZChm3ZB0pJ4ZBSiFjZBhJBD9v68DcCIKGCdZAa0ZCeRLfEdaBylFhSv8cb8UPLL9QZBpYI');
			// 		window.localStorage.setItem("uid", '10152697962588581');

			// 		// Herman Tao
			// 		// window.localStorage.setItem("at", '"CAATsZC95ci0sBACCLWZBURAwDWD5lP4quk7FXfvQsixIZBpQSVExupbfVcGfvgpFZA4xEYy1AYuWoVtgbc1NPfl7VSzPmrUAHMRE2TTLjztf9v0aDDkk5e6H6mpICjf65nYMqCwM2na51bWhMkCfw7HMPFAozbKu0oAVZCE9OktPS14ZBYanDg9n24oNeHKgeGYRthRPivzsOhJGeD7Q8q2TpZAlGQbpanWjupQQvASsGeZAm9cQXesf"');
			// 		// window.localStorage.setItem("uid", '847120868686417');
					
			// 		_sgd.changeSection('home', { 
			// 			at: 'CAATsZC95ci0sBALFOpH9R49q2eTKqPUR0aY3fv0cOF2eSI121JPUtmaNrOdYay7YOLAecogqCMOnzZCsBqKkEEZBmA5FcqUZBHPz4mqdxGz82osRPfQnUb6fRI6Emy3GQvjRMtg7xuxIkQlZCsGVHHCKiRhL4H3KikqYxZATCjIheffLlPJBtdRZChm3ZB0pJ4ZBSiFjZBhJBD9v68DcCIKGCdZAa0ZCeRLfEdaBylFhSv8cb8UPLL9QZBpYI',
			// 			uid: '10152697962588581'
			// 		});
			// 	});

			// }

		}
	});

});


'use strict';

define('PageHome', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};
	var $$ = Dom7;

	return pb.extend({
		initialize: function(){
			
			$$('#homeDebts').on('refresh', function(e){
				_sgd.debtsCredits.credits.fetchDatas({
					reset: true,
					complete: function(){
						sgd.framework7.pullToRefreshDone();
					}
				});
			});

		},
		beforeShow: function(){
			_sgd.debtsCredits.clearDetailDatas();
		},
		onShow: function(pParam, next){
			_sgd.resetForm();
			_sgd.debtsCredits.credits.fetchDatas();

			next();
		}
	});

});


'use strict';

define('PageDetail', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};

	return pb.extend({
		initialize: function(){
			$('#connectUser').on('click', function(){
				var fromUID = $(this).data('uid');
				_sgd.popupFriendList.loadUserPicker(function(pToUID){
					if(fromUID && pToUID){
						$.ajax({
							url: _sgd.apiPrefix + '/api/connectUser',
							dataType: 'jsonp',
							data: { from: fromUID, to:pToUID, uid: sgd.userUID },
							success: function (data) {
								if(data.status){
									_sgd.changeSection('home');
								}
							}
						});
					}
				});
			});
			$("#dataListDetailWrap .icon-share").on('click', function(){
				var _this = this;
				var getMessage = function(pSum){
					if(pSum > 0)
						return "Hello, you own me $" + Math.abs(pSum);
					else 
						return "Hello, I own you $" + Math.abs(pSum);
				};
				var buttons = [
					{
						text: 'Line',
						onClick: function () {
							var sum = _sgd.debtsCredits.getSumByUID($(_this).data('uid'));
							console.log("line://msg/text/" + getMessage(sum));
							window.location.href = "line://msg/text/" + getMessage(sum);
						}
					},
					{
						text: 'Whatsapp',
						onClick: function () {
							var sum = _sgd.debtsCredits.getSumByUID($(_this).data('uid'));
							console.log("line://msg/text/" + getMessage(sum));
							window.location.href = "whatsapp://send?text=" + getMessage(sum);
						}
					}
				];
				_sgd.framework7.actions(buttons);
			});
		},
		beforeShow: function(page){
			if(page.query.uid.indexOf('-') > -1){
				$('#connectUser').show().data('uid', page.query.uid);
			} else{
				$('#connectUser').hide().data('uid', '');
			}
		},
		afterShow: function(page){
			if(page.query.uid){
				if(page.query.uid.indexOf('-') > -1){
					$('#connectUser').show().data('uid', page.query.uid);
				} else{
					$('#connectUser').hide().data('uid', '');
				}
				$("#dataListDetailWrap .icon-plus").data('uid', page.query.uid);
				$("#dataListDetailWrap .icon-share").data('uid', page.query.uid);
				_sgd.debtsCredits.loadDetailByUID(page.query.uid);
			} else {
				_sgd.changeSection('home');
			}
		},
		onShow: function(pParam, next){
			_sgd.resetForm();
			_sgd.debtsCredits.credits.fetchDatas();

			next();
		}
	});

});


'use strict';

define('PageForm', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};

	return pb.extend({
		initialize: function(){
			$('.debtType .left').on('click', function(){
				$('.debtType .middle').addClass('creatorDebt');
			});
			$('.debtType .right').on('click', function(){
				$('.debtType .middle').removeClass('creatorDebt');
			});
			$('.debtType .middle').on('click', function(){
				if($(this).hasClass('creatorDebt'))
					$(this).removeClass('creatorDebt');
				else 
					$(this).addClass('creatorDebt');
			});
		}
	});
});


'use strict';

define('PageFormSecond', ['PageBase'], function(pb){

	var _sgd = (window.sgd) ? window.sgd : {};

	return pb.extend({
		beforeShow: function(page){
			if($('#otherUserID').val() && $('#otherUserID').val().indexOf('-') === -1){
				$('.debtType .right').html('<img src=\"http://graph.facebook.com/' + $('#otherUserID').val() + '/picture\" alt=\"\" />');
			} else if($('#otherUserName').val()){
				$('.debtType .right').html('<span>' + $('#otherUserName').val() + '</span>');
			} else {
				_sgd.framework7.alert('Please enter a name / select a wooishui user', function(){
					_sgd.changeSection('form');
				});
			}
		},
		onShow: function(pParam, next){
			if($('#otherUserID').val() === '' && $('#otherUserName').val() === ''){
				_sgd.framework7.alert('Please enter a name / select a wooishui user', ['Name missing']);
				return false;
			}
			next();
		}
	});

});


'use strict';

// @codekit-prepend "../bower_components/jquery/dist/jquery.js";
// @codekit-prepend "../bower_components/underscore/underscore-min.js";
// @codekit-prepend "../bower_components/backbone/backbone.js";
// @codekit-prepend "../bower_components/momentjs/min/moment.min.js";
// @codekit-prepend "../bower_components/framework7/dist/js/framework7.min.js";
// @codekit-prepend "../bower_components/requirejs/require.js";
// @codekit-prepend "class/CreditDetailView.js";
// @codekit-prepend "class/NotificationHandler.js";
// @codekit-prepend "class/CreditView.js";
// @codekit-prepend "class/DebtsCredits.js";
// @codekit-prepend "class/FacebookHelper.js";
// @codekit-prepend "class/PopupFriendList.js";
// @codekit-prepend "class/RejectedView.js";
// @codekit-prepend "pages/PageBase.js";
// @codekit-prepend "pages/PageLogin.js";
// @codekit-prepend "pages/PageHome.js";
// @codekit-prepend "pages/PageDetail.js";
// @codekit-prepend "pages/PageForm.js";
// @codekit-prepend "pages/PageFormSecond.js";

require([
		'NotificationHandler', 
		'FacebookHelper', 
		'PopupFriendList', 
		'DebtsCredits', 
		'PageLogin',
		'PageHome',
		'PageDetail',
		'PageForm',
		'PageFormSecond'
	], function(nh, fbh, pfl, dc, pageLogin, pageHome, pageDetail, pageForm, pageFormSecond){
	
	var $$ = Dom7, _sgd = (window.sgd) ? window.sgd : {};

	_sgd.notification = new nh();
	_sgd.accessToken = window.localStorage.getItem('at');
	_sgd.userUID = window.localStorage.getItem('uid');
	_sgd.framework7 = new Framework7();
	_sgd.mainView = _sgd.framework7.addView('.view-main', { domCache: true });

	_sgd.resetForm = function(){
		$('#otherUserID').val('');
		$('#otherUserName').val('');
		$("#debtForm input[name=itemid]").val('');
		$("#debtForm input[name=callback]").val('');
		$('#debtForm')[0].reset();
	};

	_sgd.changeSection = function(pPath, pParam){
		if(_sgd.pageList[pPath]) {
			_sgd.pageList[pPath].onShow(pParam, function(){
				_sgd.mainView.router.load({ pageName: pPath, query: pParam });
			});
		} else {
			_sgd.mainView.router.load({ pageName: pPath, query: pParam });
		}
	};
	_sgd.framework7.onPageAfterAnimation('*', function(page){
		var path = page.name;
		if(_sgd.pageList[path]) _sgd.pageList[path].afterShow(page);
	});
	_sgd.framework7.onPageBeforeAnimation('*', function(page){
		var path = page.name;
		var from = page.fromPage.name;
		if(_sgd.pageList[from]) _sgd.pageList[from].hide(page);
		if(_sgd.pageList[path]) _sgd.pageList[path].beforeShow(page);
	});

	_sgd.popupFriendList = new pfl({
		wrapper: '#friendList',
		inviteTarget: '#nonRegFriend',
		friendTarget: '#regFriend',
		getFriendHandler: function(pCallback){
			_sgd.facebookHelper.getFriendList(pCallback);
		},
		getInvitableHandler: function(pCallback){
			_sgd.facebookHelper.getInvitableList(pCallback);
		}
	});
	_sgd.facebookHelper = new fbh(function(){
		_sgd.debtsCredits.credits.fetchDatas();
	});
	_sgd.submitDebt = function(){
		var _q = {
			isCreatorDebt: $('.debtType .middle').hasClass('creatorDebt'),
			price: parseFloat($('#debtForm input[name=price]').val()) || 0,
			desc: $('#debtForm input[name=desc]').val(),
			otherUserID: $('#otherUserID').val(),
			otherUserName: $('#otherUserName').val(),
			itemid: $("#debtForm input[name=itemid]").val(),
			curUser: sgd.userUID
		};
		if(_q.price != ''){
			$.ajax({
				url: _sgd.apiPrefix + '/api/debtsSubmit',
				dataType: 'jsonp',
				data: _q,
				success: function (data) {
					if(data.status){
						if($('#debtForm input[name=callback]').val() != ''){
							_sgd.debtsCredits.credits.fetchDatas();
							Backbone.history.loadUrl(Backbone.history.fragment);
							_sgd.resetForm();
						} else {
							_sgd.changeSection('home');
						}
					}
				}
			});
		} else {
			sgd.framework7.alert('Please fill in an amount', ['Amount missing']);
		}
	};
	
	_sgd.pageList = {
		login: new pageLogin(),
		home: new pageHome(),
		detail: new pageDetail(),
		form: new pageForm(),
		'form-second': new pageFormSecond()
	};

	if(_sgd.accessToken && _sgd.userUID){
		_sgd.debtsCredits = new dc();
		$('.userImageContain').html('<img src="http://graph.facebook.com/' + _sgd.userUID + '/picture" height="50" alt="" />');
	} else {
		window.location.href = "index.html";
	}

	$$('.menu-link').on('click', function () {
		var buttons = [
			{
				text: 'Invite friend',
				onClick: function () {
					facebookConnectPlugin.showDialog({
						method: 'apprequests',
						title : 'wooishui',
						message: 'Lets use wooishui to maintain your debts!',
						filters: ['app_non_users']
					}, function(response){
						
					});
				}
			},
			{
				text: 'Sign Out',
				onClick: function () {
					facebookConnectPlugin.logout(function(){
						window.localStorage.setItem("at", '');
						window.localStorage.setItem("uid", '');
						window.location.href = 'index.html';
					}, function(){
						_sgd.framework7.alert('Logout fail', ['Please try again']);
					});
				}
			}
		];
		_sgd.framework7.actions(buttons);
	});
	$("#dataListDetailWrap .icon-plus").on('click', function(){
		var _userUID = $(this).data('uid');
		var _userData = _sgd.debtsCredits.getUserByUID($(this).data('uid')).toJSON();
		var _userName = (_userData.debtorsUID === _userUID) ? _userData.debtorsName : _userData.creditorName;
		$('input#otherUserName').val(_userName);
		$('input#otherUserID').val(_userUID);
		_sgd.changeSection('form-second');
	});
	$('#menu a.internal').on('click', function(){
		_sgd.changeSection($(this).attr('href'));
		_sgd.framework7.closePanel();
		return false;
	});
	$('#inviteFriend').on('opened', function () {
		_sgd.popupFriendList.startLoading();
	});
	$('#friendList').on('opened', function () {
		_sgd.popupFriendList.startLoading();
	});
	$('.friendListSearch').on('input', function(){
		var curText = $(this).val();
		var target = $(this).data('target');
		if(curText != ''){
			var filtered = $(target + ' .item-content').filter(function(pIndex, pEl){
				return $(pEl).find('.item-title').text().indexOf(curText) > -1;
			});
			$(target + ' .item-content').hide();
			filtered.show();
		} else {
			$(target + ' .item-content').show();
		}
	});
});

