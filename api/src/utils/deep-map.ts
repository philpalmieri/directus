export function deepMap(
	object: Record<string, any>,
	iterator: (value: any, key: string | number) => any,
	context?: any
): any {
	if (Array.isArray(object)) {
		return object.map(function (val, key) {
			return typeof val === 'object'
				? deepMap(val, iterator, context)
				: iterator.call(context, val, key);
		});
	} else if (typeof object === 'object') {
		const res: Record<string, any> = {};

		for (var key in object) {
			var val = object[key];

			if (typeof val === 'object') {
				res[key] = deepMap(val, iterator, context);
			} else {
				res[key] = iterator.call(context, val, key);
			}
		}

		return res;
	} else {
		return object;
	}
}
