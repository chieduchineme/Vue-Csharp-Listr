delimiter ;;
drop procedure if exists SelectVaultKeeps; ;;
create procedure SelectVaultKeeps(VaultId int)
begin
	declare sort Enum('DEFAULT','VIEWS', 'KEEPS') default 'DEFAULT';

	set sort = (select settings_sort from settings limit 1);

	select
		*
	from
		map_vault_keep a
        left join keep b on a.keep_id = b.keep_id
        left join
        (
			select
				user_id,
                user_username,
                user_color,
                user_img_url
			from
				`user`
        ) c on b.user_id = c.user_id
	where
		a.vault_id = VaultId
	order by
		case sort
			when "DEFAULT" then b.keep_id
            when "VIEWS" then b.keep_view_count
            when "KEEPS" then b.keep_keep_count
		end desc;
end; ;;
delimiter ;

call SelectVaultKeeps(1);
select settings_sort from settings;